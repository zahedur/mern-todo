const Todo = require('../models/Todo');
const validations = require("../helpers/validations");
const moment = require('moment-timezone');
const {myDate} = require("../helpers/date");

exports.Index = async (req, res) => {
    let user = req.headers.user;

    Todo.find({userId: user._id}, (err, data) => {
        if (err) {
            res.status(400).json({ status: "fail", error: err })
        }else{
            res.status(200).json({ status: "success", todos: data })
        }
    })
}

exports.Create = async (req, res) => {
    let reqBody = req.body;
    let user = req.headers.user;

    console.log(reqBody)

    const formData = {
        userId: user._id || '',
        name: reqBody['name'] || '',
        description: reqBody['description'] || '',
        status: false,
        createdAt:  myDate()
    }

    const validation = await validations.todoCreateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: false, message: 'Validation Error', error: validation })
    }

    // Create Member
    Todo.create(formData, (err, data) => {
        if (err) {
            res.status(400).json({status: false, error: err})
        } else {
            res.status(201).json({
                status: true,
                message: 'Todo created successfully',
                todo: data
            })
        }
    })

}

exports.Edit = async (req, res) => {
    const id =  req.body['id'] || '';
    let user = req.headers.user;

    if (!id){
        return res.status(422).json({ status: false, message: 'Validation Error', error: {id: "id is required"} })
    }

    try {
        //todo
        const todo = await Todo.findOne({_id: id, userId: user._id});
        if (!todo) {
            return res.status(400).json({status: false, message: 'Not found'})
        }

        return res.status(200).json({status: 'success', todo: todo});
    }catch (err) {
        return res.status(400).json({status: false, message: err})
    }
}

exports.Update = async (req, res) => {
    let reqBody = req.body;
    let user = req.headers.user;

    const formData = {
        id: reqBody['id'] || '',
        name: reqBody['name'] || '',
        description: reqBody['description'] || '',
        updatedAt:  myDate()
    }

    const validation = await validations.todoUpdateValidation(formData);
    if (Object.keys(validation).length){
        return res.status(422).json({ status: false, message: 'Validation Error', error: validation })
    }

    try {
        //todo
        const todo = await Todo.findOne({_id: formData.id,  userId: user._id});
        if (!todo) {
            return res.status(400).json({status: false, message: 'Invalid id'})
        }

        // Update todo
        const needUpdate = {...formData};
        delete needUpdate.id;
        const update = await Todo.updateOne({_id: formData.id, userId: user._id}, needUpdate, {insert: true}).exec();

        if (update.acknowledged){
            const updatedTodo = await Todo.findOne({_id: formData.id,  userId: user._id}).exec();
            res.status(201).json({
                status: true,
                message: 'Todo updated successfully',
                todo: updatedTodo
            })
        }

    }catch (err) {
        return res.status(400).json({status: false, message: err})
    }
}

exports.Delete = async (req, res) => {
    let reqBody = req.body;
    let id = reqBody['id'];
    let user = req.headers.user;

    if (!id){
        return res.status(422).json({ status: false, message: 'Validation Error', error: { id: "id is required"} })
    }

    try {
        //todo
        const todo = await Todo.findOne({_id: id, userId: user._id});
        if (!todo) {
            return res.status(400).json({status: false, message: 'Invalid id'})
        }

        Todo.remove({_id: id, userId: user._id}, (err, data) => {
            if (!err) {
                return res.status(200).json({status: 'success', message: 'Todo deleted successfully'})
            }
        });
    }catch (err) {
        return res.status(400).json({status: false, message: err})
    }

}

exports.View = async (req, res) => {
    const id =  req.body['id'] || '';
    let user = req.headers.user;

    if (!id){
        return res.status(422).json({ status: false, message: 'Validation Error', error: {id: "id is required"} })
    }

    try {
        //todo
        const todo = await Todo.findOne({_id: id, userId: user._id});
        if (!todo) {
            return res.status(400).json({status: false, message: 'Not found'})
        }

        return res.status(200).json({status: 'success', todo: todo});
    }catch (err) {
        return res.status(400).json({status: false, message: err})
    }
}



exports.ChangeStatus = async (req, res) => {
    let reqBody = req.body;
    let user = req.headers.user;

    const formData = {
        id: reqBody['id'] || '',
        status: reqBody['status'] || '',
        updatedAt:  myDate()
    }

    console.log(formData)

    if (!formData.id || !formData.status ){
        return res.status(422).json({ status: false, message: 'Status and ID is required' })
    }

    try {
        //todo
        const todo = await Todo.findOne({_id: formData.id,  userId: user._id});
        if (!todo) {
            return res.status(400).json({status: false, message: 'Invalid id'})
        }

        // Update todo
        const needUpdate = { status: formData.status };
        const update = await Todo.updateOne({_id: formData.id, userId: user._id}, needUpdate, {insert: true}).exec();
        if (update.acknowledged){
            const updatedTodo = await Todo.findOne({_id: formData.id,  userId: user._id});
            res.status(201).json({
                status: true,
                message: 'Todo updated successfully',
                todo: updatedTodo
            })
        }

    }catch (err) {
        return res.status(400).json({status: false, message: err})
    }
}
