const User = require('../models/User');
const jwt = require("jsonwebtoken");
const validations = require('../helpers/validations');
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');
const {myDate} = require("../helpers/date");

exports.Login = async (req, res) => {
    let reqBody = req.body;

    const formData = {
        email:           reqBody['email'] || '',
        password:           reqBody['password'] || '',
    }

    // Validation
    const validation = validations.loginValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: false, message: 'Validation Error', error: validation })
    }

    try {
        // username check
        const user = await User.findOne({email: formData.email}).exec();
        if (!user){
            return res.status(401).json({status: false, message: 'provided credentials are incorrect'})
        }

        if (! bcrypt.compareSync(formData.password, user.password)) {
            return res.status(401).json({status: false, message: 'provided credentials are incorrect'})
        } else {
            let userData = user;
            userData.password = undefined;

            let payload = {
                exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
                data: userData
            }
            let token = jwt.sign(payload, process.env.JWT_SECRET);

            return res.status(200).json({status: true, message: 'Login Success', token: token, user: userData});
        }
    }catch (err) {
        console.log(err)
        return res.status(400).json({status: false, message: err})
    }
}

exports.Register = async (req, res) => {
    let reqBody = req.body;

    console.log(reqBody['firstName'])

    const formData = {
        firstName:          reqBody['firstName'] || '',
        lastName:           reqBody['lastName'] || '',
        email:              reqBody['email'] || '',
        password:           reqBody['password'] || '',
        confirmPassword:    reqBody['confirmPassword'] || '',
        role:               reqBody['role'] || 'User',
        createdAt:          myDate()
    }

    // Validation
    const validation = validations.registerValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: false, message: 'Validation Error', error: validation })
    }



    //email check
    const emailExist = await User.findOne({email: formData.email});
    if (emailExist){
        const existError = {email: 'Email has already taken'}
        return res.status(422).json({ status: false, message: 'Validation Error', 'error': existError })
    }


    // Make hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(formData.confirmPassword, salt);

    delete formData.confirmPassword
    formData.password = hashedPassword;

    User.create(formData, (err, data) => {
        if (err){
            res.status(400).json({ status: 'fail', error: err })
        }else{
            res.status(201).json({ status: 'success', message: 'Account created successfully' })
        }
    })
}

exports.User = (req, res) => {
    const user = req.headers.user;
    res.status(200).json({status: true, user: user});
}
