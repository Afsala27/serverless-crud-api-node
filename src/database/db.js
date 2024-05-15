const mongoose = require("mongoose")


let connection = null;

exports.conectDatabase = async () => {
    if(connection == null){
        console.log("creating new connection to database")
        connection = await mongoose.connect(process.env.DB, {
            serverSelectionTimeoutMS: 5000,
        })
        return connection;
    }

    console.log("connection established, reusing existing connection")
}