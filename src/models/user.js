const bcrypt = require('bcryptjs/dist/bcrypt')
const mongoose = require('mongoose')
const validator = require('validator')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please add your name"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validator.isEmail, 'please enter valid email']
    },
    password: {
        type: String,
        required: [true, 'pleease set a password'],
        minlength: 6,
        select: false
    }
})

UserSchema.pre('save', async function(next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next();
})

module.exports = mongoose.model('User', UserSchema)