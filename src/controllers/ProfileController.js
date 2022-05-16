const validations = require("../helpers/validations");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const moment = require('moment-timezone');


exports.Profile = (req, res) => {
    let user = req.headers['user'];

    User.findOne( { _id: user._id }, { password: 0 }, (err, data) => {
        if (!err && data !== null){
            res.status(200).json({ status: 'success', user: data })
        }else{
            res.status(401).json({ status: false, message: "Unauthorized" })
        }
    })

}

exports.UpdateProfile = async (req, res) => {
    let reqBody = req.body;
    let user = req.headers['user'];

    // Form data
    const formData = {
        firstName:  reqBody['firstName'] || '',
        lastName:   reqBody['lastName'] || '',
        email:      reqBody['email'] || '',
        updatedAt:  moment.tz(process.env.TIME_ZONE).format()
    }

    // Validation
    const validation = validations.updateProfileValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {
        // Check exist email
        User.findOne({email: formData.email, _id: {$ne: user._id}}, (err, ExistEmail) => {
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
                    User.findOne({username: formData.username, _id: {$ne: user._id}}, (err, ExistUsername) => {
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
                                User.updateOne({_id: user._id}, formData, {upsert: true}, (err, updated) => {
                                    if (err) {
                                        return res.status(400).json({status: 'fail', error: err})
                                    } else {
                                        User.findOne({_id: user._id}, { password: 0 }, (err, userUpdatedData) => {
                                            if (err){
                                                res.status(400).json({
                                                    status: 'fail',
                                                    message: err,
                                                })
                                            }else{
                                                res.status(200).json({
                                                    status: 'success',
                                                    message: 'Profile updated successfully',
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

exports.changePassword = async (req, res) => {
    let reqBody = req.body;
    let user = req.headers['user'];

    // Form data
    const formData = {
        oldPassword: reqBody['oldPassword'] || '',
        newPassword: reqBody['newPassword'] || '',
        confirmPassword: reqBody['confirmPassword'] || '',
        updatedAt: moment.tz(process.env.TIME_ZONE).format()
    }

    // Validation
    const validation = validations.changePasswordValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: 'fail', message: 'Validation Error', error: validation })
    }else {

        // Check old password
        User.findOne({_id: user._id}, (err, data) => {
            if (err) {
                return res.status(400).json({status: "fail", message: err});
            } else {

                if (data !== null){
                    if (! bcrypt.compareSync(formData.oldPassword, data.password)) {
                        return res.status(401).json({
                            status: "fail",
                            message: 'Validation Error',
                            error: {oldPassword: "Incorrect old password"}
                        })
                    } else {
                        // Make hash password
                        const salt = bcrypt.genSaltSync(10);
                        const data = {
                            password: bcrypt.hashSync(formData.confirmPassword, salt)
                        }

                        User.updateOne({_id: user._id}, {$set: data}, {upsert: true}, (err, data) => {
                            if (err) {
                                res.status(400).json({status: 'fail', error: err})
                            } else {
                                res.status(201).json({status: 'success', message: 'Password changed successfully'})
                            }
                        })
                    }
                }else {
                    return res.status(400).json({status: "fail", message: "User doesn't exist"});
                }
            }
        })
    }

}
