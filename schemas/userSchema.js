const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive']
    },
    date: {
        type: Date,
        default: Date.now
    }
})

// custom instance method

// todoSchema.methods = {
//     findActive: function(value){
//         return mongoose.model("Todo").find({ status: value });
//     },
//     findActiveCallback: function(value, cb){
//         return mongoose.model("Todo").find({ status: value }, cb);
//     }
// }

// custom statics method // tis can access direct call Model class
// do not need to crete initialize new instance

// todoSchema.statics = {
//     findTitle: function (value) {
//         // return this.find({title:{$regex: value}})  // case sensitive
//         return this.find({ title: new RegExp(value, 'i') }) // case insensitive
//     }
// }

// custom Query Helpers method // tis can access as query method like select(), limit()
// do not need to crete initialize new instance

// todoSchema.query = {
//     byLanguage: function (value) {
//         // return this.find({title:{$regex: value}})  // case sensitive
//         return this.find({ title: new RegExp(value, 'i') }) // case insensitive
//     }
// }

module.exports = userSchema;