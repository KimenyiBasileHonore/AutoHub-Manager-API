const express = require ( 'express');
import checkAuth from '../middleware/checkAuthentication';
const {ClientSignup,ClientLogin,VendorSignup,VendorLogin,getAllUsers,getClientById,getClientProfile,UserCount} = require ('../controllers/userController'); 
const router = require("express").Router();


router.post('/client/signup', ClientSignup); 
router.post('/client/login', ClientLogin);  
router.post('/vendor/signup', VendorSignup);
router.post('/vendor/login', VendorLogin); 
router.get('/client-list', getAllUsers) ;
router.get('/clientId/:id',getClientById)
router.get('/client/profile', checkAuth,getClientProfile);
router.get('/count-clients', UserCount);

module.exports = router;
