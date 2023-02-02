const bcrypt = require('bcrypt');

const generatePasswordHash = async (password) => {
    try {
        // generate Password Hash
        let hashePassword = await bcrypt.hash(password, 10);
        return hashePassword;
    } catch (error) {
        console.log("Generate Password Hash Helper", error);
        throw new Error("Password Hash failure!");
    }
}

const comparePasswordHash = async (password, hashPassword) => {
    try {
        // generate Password Hash
        const isValidPassword = await bcrypt.compare(password, hashPassword);
        if (isValidPassword) return true;
        else return false;
    } catch (error) {
        console.log("Generate Password Hash Helper", error);
        throw new Error("Password Hash failure!");
    }
}

module.exports = { generatePasswordHash, comparePasswordHash };