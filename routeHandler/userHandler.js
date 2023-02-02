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


// GET ALL THE TODOS
// router.get('/', async (req, res) => {
//     try {
//         // need to call Todo Object Model directly
//         const filterBy = req.body ? { ...req.body } : {};
//         const result = await Todo.
//             // find(filterBy)
//             // search by text
//             find({ title: { $regex: req.body.title } })
//             .select({ __v: 0 })
//             .limit(2)

//         //.exec((err, data)=>{})
//         console.log(result);
//         res.status(200).json({
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

//GET A TODAY BY ID


// GET BY STATUS ACTIVE/INACTIVE
// CUSTOM METHOD
// router.get('/status', async (req, res) => {
//     try {
//         const newTodo = new Todo();
//         const result = await newTodo.findActive(req.body.status);
//         console.log(result);
//         res.status(200).json({
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// GET BY STATUS ACTIVE/INACTIVE
// CUSTOM METHOD WITH CALLBACK
// router.get('/status-callback', (req, res) => {
//     const newTodo = new Todo();
//     newTodo.findActiveCallback(req.body.status, (err, data) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({
//                 error: "There was a server side error!"
//             })
//         } else {
//             console.log(data);
//             res.status(200).json({
//                 data
//             })
//         }
//     });


// });

// GET BY TITLE SEARCH
// CUSTOM STATICS METHOD
// router.get('/title', async (req, res) => {
//     try {
//         const result = await Todo.findTitle(req.body.title);
//         console.log(result);
//         res.status(200).json({
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// GET BY TITLE SEARCH
// CUSTOM Query Helpers METHOD call after find()

// router.get('/title-query-helpers', async (req, res) => {
//     try {
//         const result = await Todo.find().byLanguage(req.body.title);
//         console.log(result);
//         res.status(200).json({
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// POST MULTIPLE TODO
// router.post('/all', async (req, res, next) => {
//     try {
//         // need to call Todo Object Model directly
//         const result = await Todo.insertMany(req.body);
//         console.log(result);
//         res.status(200).json({
//             message: "Todos were inserted Successfully!",
//             //data: result
//         })
//     } catch (err) {
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// // PUT TODO
// router.put('/:id', async (req, res) => {
//     try {
//         // need to call Todo Object Model directly
//         // update result can not return
//         // if we need update result then we use Todo.findByIdAndUpdate()
//         const result = await Todo.updateOne(
//             {
//                 _id: req.params.id
//             },
//             {
//                 $set: {
//                     title: req.body.title,
//                     status: req.body.status,
//                     discriptins: req.body.discriptins
//                 }
//             }
//         );
//         console.log(result);
//         res.status(200).json({
//             message: "Todo wase Update Successfully!",
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// router.put('/update-with-result/:id', async (req, res) => {
//     try {
//         // need to call Todo Object Model directly
//         // update result can not return
//         // if we need update result then we use Todo.findByIdAndUpdate()
//         //updateMany()  // for multiple update
//         const result = await Todo.findByIdAndUpdate(
//             {
//                 _id: req.params.id
//             },
//             {
//                 $set: {
//                     title: req.body.title,
//                     status: req.body.status,
//                     discriptins: req.body.discriptins
//                 }
//             },
//             {
//                 new: true // use for return updated result
//             }
//         );
//         console.log(result);
//         res.status(200).json({
//             message: "Todo wase Update Successfully!",
//             data: result
//         })
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });

// //DELETE TODO
// router.delete('/:id', async (req, res) => {
//     try {
//         // deleteMany()
//         //findByIdAndDelete()
//         const result = await Todo.deleteOne({ _id: req.params.id });
//         console.log(result);
//         res.status(200).json({
//             message: "Todos were Deleted Successfully!",
//         })
//     } catch (err) {
//         res.status(500).json({
//             error: "There was a server side error!"
//         })
//     }
// });


module.exports = router;