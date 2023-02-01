const { default: mongoose } = require("mongoose");

const todoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discriptins: String,
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = todoSchema;