import User from '../models/client';
import Vendor from '../models/vendor';
import generateToken from '../helpers/tokenGenerator';


exports.ClientSignup = async (req, res) => {
  try {
    const { names, address,  phone, email, password,role } = req.body;


    const client = new User({
      names,
      address,
      phone,
      email,
      password,
      role,
    });


    await client.save();
    const token = await generateToken(email);
    console.log(client);
    res.status(201).json({ message: 'User registered successfully', "token" : token});
  } catch (error) {
    res.status(500).json(error );
  }
};


exports.ClientLogin = async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = await generateToken(email);
    res.status(200).json({ message: 'User logged in successfully', "token" :token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
};


exports.VendorSignup = async (req, res) => {
  try {
    const { businessname, address, regno, businessemail, password, role } = req.body;

    
    const existingCompany = await Vendor.findOne({ businessname });

    if (existingCompany) {
      return res.status(400).json({ error: 'Company name already exists' });
    }

    const company = new Vendor({
      businessname,
      address,
      regno,
      businessemail,
      password,
      role,
    });

    await company.save();
    const token = await generateToken(businessemail);

    res.status(201).json({ message: 'Vendor registered successfully', "token":token });
  } catch (error) {
    res.status(500).json({ error: 'Error registering company' });
  }
};

exports.getCompanyNames = async (req, res) => {
  try {
    
    const companies = await Vendor.find({}, 'businessname'); 
    const companyNames = companies.map((company) => company.CompanyName);
    res.status(200).json(companyNames);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching company names' });
  }
};

exports.VendorLogin = async (req, res) => {
  try {
    const { businessemail, password } = req.body;
    const company = await Vendor.findOne({ businessemail });
    if (!company || company.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = await generateToken(businessemail);;
    res.status(200).json({ message: 'Vendor logged in successfully',token:token });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in company' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    res.status(200).json({ users });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await User.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error("Error fetching client:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getClientProfile = async (req, res) => {
  try {
    const client = req.user; // Assuming `req.user` is set by authentication middleware
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json(client);
  } catch (error) {
    console.error('Error fetching client profile:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.UserCount = async (req, res) => {
  try {
    const clientCount = await User.countDocuments();
    res.status(200).json({ totalClients: clientCount });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};