const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const todoSchema = require('../schemas/todoSchema');
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get('/', async (req, res) => {
    try {
        // need to call Todo Object Model directly
        const filterBy = req.body ? {...req.body}: {};
        const result = await Todo.
        // find(filterBy)
        // search by text
        find({ title: { $regex:  req.body.title}})
        .select({__v: 0})
        .limit(2)

        //.exec((err, data)=>{})
        console.log(result);
        res.status(200).json({
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "There was a server side error!"
        })
    }
});

//GET A TODAY BY ID
router.get('/id', (req, res) => {

});

//POST TODO
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        const result = await newTodo.save();
        console.log(result);
        res.status(200).json({
            message: "Todo was inserted Successfully!",
            data: {
                id: result._id
            }
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })

    }

});

// POST MULTIPLE TODO
router.post('/all', async (req, res, next) => {
    try {
        // need to call Todo Object Model directly
        const result = await Todo.insertMany(req.body);
        console.log(result);
        res.status(200).json({
            message: "Todos were inserted Successfully!",
            //data: result
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    }
});

// PUT TODO
router.put('/:id', async (req, res) => {
    try {
        // need to call Todo Object Model directly
        // update result can not return
        // if we need update result then we use Todo.findByIdAndUpdate()
        const result = await Todo.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: {
                    title: req.body.title,
                    status: req.body.status,
                    discriptins: req.body.discriptins
                }
            }
            );
        console.log(result);
        res.status(200).json({
            message: "Todo wase Update Successfully!",
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "There was a server side error!"
        })
    }
});

router.put('/update-with-result/:id', async (req, res) => {
    try {
        // need to call Todo Object Model directly
        // update result can not return
        // if we need update result then we use Todo.findByIdAndUpdate()
        //updateMany()  // for multiple update
        const result = await Todo.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    title: req.body.title,
                    status: req.body.status,
                    discriptins: req.body.discriptins
                }
            },
            {
                new : true // use for return updated result
            }
            );
        console.log(result);
        res.status(200).json({
            message: "Todo wase Update Successfully!",
            data: result
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "There was a server side error!"
        })
    }
});

//DELETE TODO
router.delete('/:id', async (req, res) => {
    try {
        // deleteMany()
        //findByIdAndDelete()
        const result = await Todo.deleteOne({_id: req.params.id});
        console.log(result);
        res.status(200).json({
            message: "Todos were Deleted Successfully!",
        })
    } catch (err) {
        res.status(500).json({
            error: "There was a server side error!"
        })
    }
});


module.exports = router;