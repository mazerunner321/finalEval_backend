const express = require('express');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const { userModel } = require('../model/userModel')

const bcrypt = require('bcrypt');

const userRouter = express.Router();

//Register:
userRouter.post('/register', (req, res) => {
    const { name, email, gender, password, age, city } = req.body;
    try {
        //Hashing:
        bcrypt.hash(password, 5, async (err, hashedPass) => {
            if (err) {
                console.log(err);
            }
            else {
                const user = new userModel({ name, email, gender, password: hashedPass, age, city });
                await user.save();
                res.send("New user registered");
            }
        });
    } catch (error) {
        console.log('Error in register route', error);
        res.send("Error in user->register route");
    }
});

//Login:
userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.find({ email });
        if (user.length) {
            bcrypt.compare(password, user[0].password, (err, result) => {
                if (result) {
                    var token = jwt.sign({ userID: user[0]._id }, process.env.key);
                    res.send({ "message": "Login Successful", "token": token });
                } else {
                    res.send("Error in decrypting password");
                }
            });
        } else {
            res.send(`${req.body.email} check your email or password`);
        }
    } catch (error) {
        console.log("Error in users-->login route", error);
        res.send("Error in Login route");
    }
});


module.exports = { userRouter };