//mongoose models are use to create structure of the data that will be stored in the database

import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    _id : {type: String , require: true},
    _name : {type: String , require: true},
    _email : {type: String , require: true, unique: true},
    _cartItems : {type: Object , require: true}
})

const User = mongoose.model.user || mongoose.model('user', userSchema)

export default User