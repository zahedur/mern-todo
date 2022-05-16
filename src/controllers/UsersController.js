const User = require('../models/User');
const validations = require("../helpers/validations");
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');

exports.Index = (req, res) => {

    let projection = { password: 0 }

    User.find({}, projection, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            res.status(200).json({ status: "success", data: { users: data } })
        }
    })
}

exports.Create = (req, res) => {
    let reqBody = req.body;

    const formData = {
        firstName:         reqBody['firstName'] || '',
        lastName:          reqBody['lastName'] || '',
        email:             reqBody['email'] || '',
        username:          reqBody['username'] || '',
        password:          reqBody['password'] || '',
        confirmPassword:   reqBody['confirmPassword'] || '',
        role:              reqBody['role'] || '',
        createdAt:         moment.tz(process.env.TIME_ZONE).format()
    }

    // Validation
    const validation = validations.userCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Check exist email
        User.findOne({email: formData.email}, (err, existEmail) => {
            if (err) {
                return res.status(400).json({status: 'fail', message: err})
            }else{

                if (existEmail !== null) {
                    return res.status(422).json({
                        status: 'fail',
                        message: 'Validation Error',
                        error: {email: "The email has already been taken."}
                    })
                } else {
                    // Check exist username
                    User.findOne({username: formData.username}, (err, ExistUsername) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else{

                            if (ExistUsername !== null) {
                                return res.status(422).json({
                                    status: 'fail',
                                    message: 'Validation Error',
                                    error: {username: "The username has already been taken."}
                                })
                            } else {


                                // Make hash password
                                const salt = bcrypt.genSaltSync(10);
                                formData.password = bcrypt.hashSync(formData.confirmPassword, salt);

                                User.create(formData, (err, userData) => {
                                    if (err) {
                                        res.status(400).json({status: 'fail', error: err})
                                    } else {
                                        userData.password = undefined;
                                        res.status(201).json({
                                            status: 'success',
                                            message: 'User created successfully',
                                            data: {user: userData}
                                        })
                                    }
                                })

                            }
                        }
                    })
                }
            }
        })
    }

}

exports.Edit = (req, res) => {
    const id =  req.body['id'] || '';

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: {id: "id is required"} })
    }else{
        User.findOne({_id: id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // find user
                    User.findOne({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {
                            data.password = undefined;
                            return res.status(200).json({status: 'success', data: { user: data }})
                        }
                    })
                }
            }
        });
    }
}

exports.Update = (req, res) => {
    let reqBody = req.body;

    const formData = {
        firstName:         reqBody['firstName'] || '',
        lastName:          reqBody['lastName'] || '',
        email:             reqBody['email'] || '',
        username:          reqBody['username'] || '',
        role:              reqBody['role'] || '',
        id:                reqBody['id'] || '',
        updatedAt:         moment.tz(process.env.TIME_ZONE).format()
    }

    if (reqBody.hasOwnProperty('password')){
        const salt = bcrypt.genSaltSync(10);
        formData.password = formData.password = bcrypt.hashSync(reqBody['password'], salt);
    }

    // Validation
    const validation = validations.userUpdateValidation(formData, reqBody);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {
        User.findOne({_id: formData.id}, (err, idExist) =>{
            if (err){
                return res.status(400).json({ status: 'fail', message: err })
            }else{
                if (idExist === null){
                    return res.status(400).json({ status: 'fail', message: 'Invalid id' })
                }else{
                    // Check exist email
                    User.findOne({email: formData.email, _id: {$ne: formData.id}}, (err, ExistEmail) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        }else {

                            if (ExistEmail !== null) {
                                return res.status(422).json({
                                    status: 'fail',
                                    message: 'Validation Error',
                                    error: {email: "The email has already been taken."}
                                })
                            } else {

                                // Check exist username
                                User.findOne({username: formData.username, _id: {$ne: formData.id}}, (err, ExistUsername) => {
                                    if (err) {
                                        return res.status(400).json({status: 'fail', message: err})
                                    }else {

                                        if (ExistUsername !== null) {
                                            return res.status(422).json({
                                                status: 'fail',
                                                message: 'Validation Error',
                                                error: {username: "The username has already been taken."}
                                            })
                                        } else {

                                            //Update user data
                                            User.updateOne({_id: formData.id}, formData, {upsert: true}, (err, updated) => {
                                                if (err) {
                                                    res.status(400).json({status: 'fail', error: err})
                                                } else {
                                                    User.findOne({_id: formData.id}, (err, userUpdatedData) => {
                                                        if (err){
                                                            res.status(400).json({
                                                                status: 'fail',
                                                                message: err,
                                                            })
                                                        }else{
                                                            userUpdatedData.password = undefined;
                                                            res.status(200).json({
                                                                status: 'success',
                                                                message: 'User updated successfully',
                                                                data: {user: userUpdatedData}
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        });


    }
}

exports.Delete = (req, res) => {
    let reqBody = req.body;

    let id = reqBody['id'];

    if (!id){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: { id: "id is required"} })
    }else{
        User.findOne( {_id: id }, (err, findData) => {
            if (err){
                return res.status(400).json({status: 'fail', message: err})
            }else {
                if (findData !== null) {
                    User.remove({_id: id}, (err, data) => {
                        if (err) {
                            return res.status(400).json({status: 'fail', message: err})
                        } else {
                            return res.status(200).json({status: 'success', message: 'User deleted successfully'})
                        }
                    });
                }else{
                    return res.status(400).json({status: 'fail', message: 'Invalid id'})
                }
            }
        });
    }
}

