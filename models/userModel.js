const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validate = require("validator")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'A user must have a name'],
    },
    email:{
        type: String,
        required:[true,'A user must have an email'],
        unique: true
    },
    password:{
        type: String,
        required:[true, 'A user must have a password'],
        min: 8,
        select: 0
    }
})

userSchema.pre('save',async function(){
    const hashedPassword = await bcrypt.hash(this.password, 12)
    this.password = hashedPassword
})

const User = mongoose.model('User', userSchema)

module.exports = User