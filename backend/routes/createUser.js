const express= require('express')
const router = express.Router()
const user =require('../models/User')
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtsecret=process.env.JWT_KEY

router.post('/createuser',[
    body('email').isEmail(),
    body('first_name').isLength({min:2}),
    body('password').isLength({min:5})
],
async(req,res)=>{
    
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    
    const salt = await bcrypt.genSalt(10);
    let hashpassword = await bcrypt.hash(req.body.password,salt)
    try {
        
        await user.create({
            // name:"tejeshwa",
            // location:"jamalpur",
            // email:"tejeshwa@gmail.com",
            // password:"123456"

            "first_name":req.body.first_name,
            "last_name":req.body.last_name,
            "location":req.body.location,
            "email":req.body.email,
            "password":hashpassword
            
        })
        res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})


router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({min:5})
],
async(req,res)=>{
    
    
    const error =validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    }
    let email=req.body.email;
    try {
        
        let userData = await user.findOne({email});
        if(!userData){
            return res.status(400).json({error:"Email not found"})
        }
        const compaire= await bcrypt.compare(req.body.password,userData.password)
        if(!compaire){
            return res.status(400).json({error:"Incorrect password"})
        }
        const data={
            user:{
                id:userData.id
            }

        }
        const authtoken = jwt.sign(data,jwtsecret)
        return res.json({success:true,authtoken});
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }
})
module.exports=router;

