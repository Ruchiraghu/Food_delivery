
const express = require('express');
const router = express.Router()
const user = require('../models/user')
const {body,validationResult} = require('express-validator');
 const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const jwtSecret = "MyNameIsEnterYourNameRuchiRaghuwanshi"


router.post('/createuser',
[   body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({min:5})
],
async(req,res)=>{
    let success = false
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
       }
      
       const salt = await bcrypt.genSalt(10);
       let setPassword = await bcrypt.hash(req.body.password,salt)
       try {
        await user.create({
            name: req.body.name,
            password: setPassword,
            email: req.body.email,
            location: req.body.location
        }).then(user => {
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret);
            success = true
            res.json({ success, authToken })
        })
            .catch(err => {
                console.log(err);
                res.json({ error: "Please enter a unique value." })
            })
} catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server error" });
}
});


router.post('/login',
[
    body('email').isEmail(),
    body('password','Incorrect Password').isLength({min:5})
],
   async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    let email = req.body.email;
try {
 let userEmail = await  user.findOne({email});
 if(!userEmail){
    return res.status(400).json({error:"Invalid credentials"})

 }
 const pwdCompare = await bcrypt.compare(req.body.password,userEmail.password)
 if(!pwdCompare){
    return res.status(400).json({error:"Invalid credentials!!"})
 }
 const data ={
    user:{
        id:userEmail.id
    }
 }
 const authToken = jwt.sign(data,jwtSecret);
 return res.json({success:true,authToken:authToken});

} catch (error) {
    console.error(error.message);
    res.status(500).json({success:false,error:"Server error"});
}
})

module.exports =router;