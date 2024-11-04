const { Sequelize } = require('sequelize');

require('dotenv').config()

const sequelize = new Sequelize(
    'master',
    process.env.MSSQL_SERVER_USER,
    process.env.MSSQL_SERVER_PASSWORD, {
        host: 'localhost',
        dialect: 'mssql',
        dialectOptions: {
            options: {
                encrypt: false,
                enableArithAbort: true,
                trustServerCertificate: true
        }
    },
    port: process.env.MSSQL_SERVER_PORT,
    schema: "dbo"
});


async function test_connection () {
    try {
        await sequelize.authenticate();
        console.log('Database successfully connected!')
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
    
}

const sync = async () => {
    await sequelize.sync();
};


module.exports = {
    test_connection,
    sequelize,
    sync
};
