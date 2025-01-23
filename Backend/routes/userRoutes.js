const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

router.post('/signup',async (req,res)=>{
   try {
     const data = req.body;
     const adminUser = await User.findOne({role : 'admin'});
     if(data.role === 'admin' && adminUser){
        res.status(400).json({message: 'admin is already exists'});
     }
       if (!/^\d{12}$/.test(data.aadharCardNumber)) {
           return res.status(400).json({ error: 'Aadhar Card Number must be exactly 12 digits' });
       }

       // Check if a user with the same Aadhar Card Number already exists
       const existingUser = await User.findOne({ aadharCardNumber: data.aadharCardNumber });
       if (existingUser) {
           return res.status(400).json({ error: 'User with the same Aadhar Card Number already exists' });
       }
       
       const newUser = new User(data);

       const response = await newUser.save();
       console.log('data saved');

       const payload = {
        id : response.id
       }

       const token = generateToken(payload);

        res.status(200).json({response:response,token: token});

   } catch (error) {
      console.log(error);
      res.status(500).json({message:'Internal Server error'});
   }
})

router.post('/login',async(req,res)=>{
    try {
        const { aadharCardNumber, password } = req.body;

        if (!password && !aadharCardNumber) {
            return res.status(400).json({ message: 'addhar Card Number and password are required' })
        }
        const user = await User.findOne({ aadharCardNumber: aadharCardNumber });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: 'invalid addhar number or password' });
        }

        const payload = {
            id: user.id
        }

        const token = generateToken(payload);

        return res.status(200).json({token : token,role: user.role});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "server Internal error"});
    }
   
})
router.get('/profile',jwtAuthMiddleware, async(req,res)=>{
    try {
        const userData = req.user;
        
        const userId = userData.id;
        const user = await User.findById(userId);
        res.status(200).json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Internal Server error'});
    }
  
})

router.put('/profile/password', jwtAuthMiddleware, async(req,res)=>{
try {
    const userId = req.user.id;
    const {currentPassword, newPassword} = req.body;
    if(!currentPassword || !newPassword){
        return res.status(400).json({message:'both new and old password are required'});
    }
    const user = await User.findById(userId);
    if(!user && !(await user.comparePassword(currentPassword))){
        res.status(400).json({message:'invalid password'});
    }
    if(currentPassword === newPassword){
        return res.status(400).json({message:'both old and new password are same.'});
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({message:'password updated'});

} catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'});
}
})


module.exports = router;