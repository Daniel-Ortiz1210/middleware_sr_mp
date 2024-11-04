const { sequelize } = require('../config/database.js');
const { User } = require('../config/models.js');
const { NotFoundError } = require('./errors.js');

const createUser = async (userBody) => {
    const t = await sequelize.transaction()

    try {
        const user = await User.create(
            userBody, { transaction: t } 
        );

        await t.commit();

        return user.toJSON();

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const updateUser = async (id, updateObject) => {
    const t = await sequelize.transaction();

    await getUser({ "id": id });

    try {

        const user = await User.update(
            updateObject,
            {
                where: {
                    "id": id
                },
                transaction: t
            }
        );
    
        await t.commit();
    
        return await getUser( {"id": id} );

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const deleteUser = async (id) => {
    const t = await sequelize.transaction();

    await getUser({ "id": id });

    try {
        const user = await User.destroy(
            {
                where: {
                    "id": id
                },
                transaction: t
            }
        )

        await t.commit()

        return user;

    } catch (error) {
        
        await t.rollback();

        throw error;
    }
};

const getUser = async (filterParams) => {

    const user = await User.findOne({ where: filterParams  })

    if ( !user ) {
        throw new NotFoundError('User not found');
    }
    
    return user.toJSON();
    
};

module.exports = {
    createUser,
    getUser,
    deleteUser,
    updateUser
};