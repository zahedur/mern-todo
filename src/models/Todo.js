const mongoose = require('mongoose');

const DataSchema = mongoose.Schema({

    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
    },
    createdAt: {
        type: String,
        default: null
    },
    updatedAt: {
        type: String,
        default: null
    }

}, {versionKey: false, autoIndex: true});



const Todo = mongoose.model('Todo', DataSchema)
module.exports = Todo;
