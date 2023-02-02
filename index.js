const express = require('express');
const  mongoose = require('mongoose')
const  dotenv = require('dotenv')
const todoHandler = require('./routeHandler/todoHandler')
const userHandler = require('./routeHandler/userHandler')

const app = express();
app.use(express.json());
dotenv.config();
// database connection with mongoose

mongoose.set('strictQuery', true);
// connections string: mongodb://localhost:27017/todos
mongoose.connect('mongodb://localhost:27017/todos')
.then(()=> console.log("MongoDB Connected"))
.catch(err=> console.log(`Mongodb connnections err ${err}`))

// config applications run port
const port = 5000;

// all routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);


// Default Error Hanler

const errorHandler =  (err, req, res, next)=>{
    if (res.headerSent) {
        return next(err)
    } else {
        res.status(500).json({error: err})
    }

}
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});