const { UniqueConstraintError } = require('sequelize')
const { createUser, getUser, deleteUser, updateUser } = require('../utils/crud.js');
const { isValidEmail, isValidPassword } = require('../utils/validators.js');
const { NotFoundError } = require('../utils/errors.js');
const { Token } = require('../token.js');


const userDetailController = async (request, response) => {
    const id = request.params.id;

    getUser({ "id": id }).then(
        (user) => {
            return response.status(200).json(
                {
                    success: true,
                    data: user
                }
            )
        },
        (error) => {
            if (error instanceof NotFoundError) {
                return response.status(error.statusCode).json(
                    {
                        success: false,
                        error: {
                            message: error.message
                        }
                    }
                )
            } else {
                return response.status(500).json(
                    {
                        success: false,
                        error: {
                            message: "Unexpected error. Check logs to verify."
                        }
                    }
                )
            }
        }
    )
};

const deleteUserController = async (request, response) => {
    const id = request.params.id;

    deleteUser(id).then(
        (isDeleted) => {
            return response.status(200).json(
                {
                    success: true,
                    data: isDeleted
                }
            )
        },
        (error) => {
            if ( error instanceof NotFoundError ) {
                return response.status(error.statusCode).json(
                    {
                        success: false,
                        error: {
                            message: error.message
                        }
                    }
                )
            } else {
                return response.status(500).json(
                    {
                        success: false,
                        error: {
                            message: "Unexpected error. Check logs to verify."
                        }
                    }
                )
            }
        }
    )

};

const createUserController = async (request, response) => {
    const newUserBody = request.body;

    if (!isValidEmail(newUserBody.email) || !isValidPassword(newUserBody.password)) {
        return response.status(400).json(
            {
                success: false,
                error: {
                    message: "User email and/or password not in the correct format"
                }
            }
        )
    }

    createUser(newUserBody).then(
        (user) => {
            return response.status(201).json(
                {
                    success: true,
                    token: new Token().encode(newUserBody),
                    data: user
                }
            );
        }, (error) => {
            if (error instanceof UniqueConstraintError) {
                return response.status(400).json(
                    {
                        success: false,
                        error: {
                            message: "There is already a user with these credentials",
                        }
                    }
                );
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
            
        }
    );

}

const updateUserController = async (request, response) => {
    const body = request.body;
    const id = request.params.id;

    updateUser(id, body).then(
        (user) => {
            return response.status(201).json(
                {
                    success: true,
                    data: user
                }
            )
        }, (error) => {
            if (error instanceof NotFoundError) {
                response.status(error.statusCode).json(
                    {
                        success: false,
                        error: {
                            message: error.message
                        }
                    }
                )

            } else {
                console.log(error);
                response.status(500).json(
                    {
                        success: false,
                        error: {
                            message: "Unexpected error. Check logs to verify"
                        }
                    }
                )
            }
        }
    )

}

module.exports = {
    userDetailController,
    deleteUserController,
    createUserController,
    updateUserController
};
