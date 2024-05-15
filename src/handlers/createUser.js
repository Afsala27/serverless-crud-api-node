
const {  conectDatabase } = require("../database/db");
const user = require('../models/user')


module.exports.handler = async (event, context)=> {

    context.callbackWaitsForEmptyEventLoop = false;

    try {
        await conectDatabase();
        const {name, email, password } = JSON.parse(event.body);
        let userObj = {
            name,
            email,
            password
        }

        userObj = await user.create(userObj)
        return {
            statusCode: 200,
            body: JSON.stringify(userObj)
        }

    } catch (error) {
        console.log(error)
        return {
            statusCode: error.message || 500,
            body: JSON.stringify({ error : error.message })
        }
    }
}