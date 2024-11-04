const { Token } = require('../token.js');
const { getUser } = require('../utils/crud.js');
const { NotFoundError } = require('../utils/errors.js');

const loginController = (request, response) => {

    const email = request.body.email;
    const password = request.body.password;
    
    if (!email || !password) {
        return response.status(400).json({ message: "Username and password are required" });
    }

    getUser({ "email": email, "password": password }).then(
        (user) => {
            const token = new Token().encode(request.body);
            return response.status(201).json(
                {
                    token
                }
            );
        }, 
        (error) => {
            if ( error instanceof NotFoundError ) {
                return response.status(error.statusCode).json(
                    {
                        success: false,
                        error: {
                            message: "User not found with provided credentials."
                        }
                    }
                )
        } else {
            console.log(error);
            return response.status(500).json(
                {
                    success: false,
                    error: {
                        message: "Unexpected error. Check logs to verify."
                    }
                }
            )
        }
    });
    
};


module.exports = loginController;
