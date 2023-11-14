const express = require('express')
const bcrypt = require('bcrypt')
const authRouter = express.Router();

const User = require('../models/users.js');
const { createToken } = require('../utils/jwt.js');

// signup
authRouter.post('/auth/signup', signUp);
// login
authRouter.post('/auth/login', login)

async function signUp(req, res){
    console.log("Signup : ", req.body)

    try{
            
        let salt = await bcrypt.genSalt();
        req.body.hashedPassword = await bcrypt.hash(
            req.body.password, salt
        );

        const user = new User(req.body);
        const response = await user.save();

        console.log("User registered");
        res.send({
            _id: user._id,
            email: user.email,
            name: user.name,
            success: true
        });
    }catch (error) {
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}

async function login(req, res){
    console.log("Login:", req.body);
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) {
            const validPassword = await bcrypt.compare(
                req.body.password, user.hashedPassword);
            if(validPassword){
                res.send({
                    _id: user._id, 
                    email: user.email,
                    name: user.name,
                    token: createToken(user),
                    success: true
                })
            } else{
                throw new Error('Invalid password');
            }
        } else {
            throw new Error('Invalid Email');
        }
    }catch(error){
        console.log(error.code, error.message);
        res.send({
            success: false,
            message: error.message
        })
    }
}


module.exports = authRouter;