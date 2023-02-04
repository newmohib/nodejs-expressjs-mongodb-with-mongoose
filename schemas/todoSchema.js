const mongoose = require("mongoose");

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
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

// custom instance method
todoSchema.methods = {
    findActive: function(value){
        return mongoose.model("Todo").find({ status: value });
    },
    findActiveCallback: function(value, cb){
        return mongoose.model("Todo").find({ status: value }, cb);
    }
}

// custom statics method // tis can access direct call Model class
// do not need to crete initialize new instance
todoSchema.statics = {
    findTitle: function (value) {
        // return this.find({title:{$regex: value}})  // case sensitive
        return this.find({ title: new RegExp(value, 'i') }) // case insensitive
    }
}

// custom Query Helpers method // tis can access as query method like select(), limit()
// do not need to crete initialize new instance
todoSchema.query = {
    byLanguage: function (value) {
        // return this.find({title:{$regex: value}})  // case sensitive
        return this.find({ title: new RegExp(value, 'i') }) // case insensitive
    }
}

module.exports = todoSchema;