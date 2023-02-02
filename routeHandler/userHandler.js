const express = require('express');
const  mongoose = require('mongoose');
const router = express.Router();
const userSchema = require('../schemas/userSchema');
const {generateToken} = require('../helpers/tokenHelper');
const { generatePasswordHash, comparePasswordHash } = require('../helpers/passwordHashHelper');
const User = new mongoose.model("User", userSchema);



//POST Signup
router.post('/signup', async (req, res) => {
    try {
        let {name, username, password, status } = req.body;
        let hashePassword = await generatePasswordHash(password);
        const newUser = new User({
            name,
            username,
            password: hashePassword,
            status
        });
        const result = await newUser.save();
        console.log(result);
        res.status(200).json({
            message: "Signup was Successfully!",
            data: {
                id: result._id
            }
        })
    } catch (err) {
        res.status(500).json({
            error: "Signup Faild!"
        })
    }
});

//POST Login
router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        const result = await User.find({username});
        if (result && result.length > 0) {
            let hashePassword = result[0].password;
            const isValidPassword  = await comparePasswordHash(password, hashePassword);

            if (isValidPassword) {
                let userObj = {  username, userId: result[0]._id };
                const token  = await generateToken(userObj);
                 res.status(200).json({
                     message: "Login was Successful",
                     data: {
                         jwt: token
                     }
                 })
             } else {
                res.status(500).json({
                    error: "Authentications failed!"
                })
             }
         }
        console.log(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Authentications failed!"
        })
    }
});

module.exports = router;