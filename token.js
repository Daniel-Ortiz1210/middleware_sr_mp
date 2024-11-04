const jwt = require('jsonwebtoken');

require('dotenv').config()

class Token {
    constructor () {
        this.secretKey = process.env.JWT_SECRET;
    } 

    encode (body) {

        const email = body.email;
        
        try {
            const token = jwt.sign({ email }, this.secretKey, { expiresIn: "1h" });
            return token;
        } catch (error) {
            console.log(error);
            return false;
        } 

    }

    verify (token) {

        try {
            const payload = jwt.verify(token, this.secretKey);
            return payload;
        } catch (error) {
            return false;
        }
    }

};

const verifyTokenMiddleware = (request, response, next) => {

    const header = request.header("Authorization") || "";
    const token = header.split(" ")[1];
    
    if (!token) {
        return response.status(401).json(
            {
                success: false,
                error: { 
                    message: "Autorization tokes not provided"
                }
            }
        );
    }
    
    const payload = new Token().verify(token);

    if (!payload) {
        return response.status(401).json(
            {
                success: false,
                error: { 
                    message: "Invalid token. Check Authorization header or login again"
                }
            }
        );
    } else {
        next();
    }
};

module.exports = { verifyTokenMiddleware, Token };
