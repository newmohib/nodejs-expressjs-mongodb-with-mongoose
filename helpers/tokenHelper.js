const jwt = require('jsonwebtoken');

const generateToken = async (userParams) => {
    //const { authorization } = req.headers;
    try {
        // generate token
        const token = jwt.sign({
            username: userParams.username,
            userId: userParams.userId,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return token;
    } catch (error) {
        console.log("Generate Token Helper", error);
        throw new Error("Authentication failure!");
    }
}

module.exports = { generateToken };