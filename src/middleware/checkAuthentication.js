import jwt from 'jsonwebtoken';
import Client from '../models/client';
import Vendor from '../models/vendor';

const checkAuth = async (req, res, next) => {
  const token = req.header('Authorization');

  try {
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    let user = await Client.findOne({ email: decoded.email });
    if (!user) {
      user = await Vendor.findOne({ businessemail: decoded.email });
    }

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Authentication token expired' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};


export default checkAuth;
