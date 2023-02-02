const jwt = require('jsonwebtoken');

const checkLogin =  (req, res, next)=>{
    const {authorization} = req.headers;
    try {
        const token = authorization ? authorization.split(' ')[1]: "";
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const { username, userId } = decoded;
            req.user = req.user ? {...req.user, username, userId }: {username, userId } ;
            next();
        } else {
            next("Authentication failure!"); 
        }
    } catch (error) {
        console.log(error);
        next("Authentication failure!");  
    }
}

module.exports = { checkLogin };