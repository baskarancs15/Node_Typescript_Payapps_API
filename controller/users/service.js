'use strict';
const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    username:String,
    email: String,
    password: String,
    createdAt:String,
  });

const model = mongoose.model('users', userSchema);


const createUser = async(data) => {
    console.log("data",data);
    try {
        const user = new model(data);
        const savedata = await user.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const checkuserexist = async(data) => {
    console.log("data",data)
    try {

        var users; 
        if(data.username)
        {
            users = await model.aggregate([
                {$match: { $or: [{ username: data.username }, { email: data.email }] }}
            ]);
        } 
         return users;
    } catch(err) {
        return false
    }
};


module.exports = { 
    createUser,
    checkuserexist,
 };