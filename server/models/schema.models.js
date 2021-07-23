const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    userName : {
        type: String,
        required: [true, "The name is required"]
    },
    email : {
        type: String,
        required: [true, "The email is required"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message : "Enter the correct format name@gmail.com"
        }
    },
    password : {
        type: String,
        required: [true, "The password is required"],
        minlength: [4, "Password must be great than 4 characters"]
    },
}, {timestamps:true}) 

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'The passwords must be match')
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
})


const User = mongoose.model("Users", UserSchema);

module.exports = User;