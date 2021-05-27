'use strict';

const httpErrors = require('http-errors');
const users = require('./service');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

const createUser = async (req, res) => {
    try {


        const checkExists = await users.checkuserexist({username:req.body.username,email:req.body.email});

        if(checkExists.length!=0){
            res.send({ status: 400, result: "Failure", message: 'User Already Exists!'}); 
            return false           
        }

        var date = new Date();
        req.body.createdAt=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const saveuser = await users.createUser(req.body)
        if(saveuser){
            res.send({result: "Success", message: 'User Added Successfully!'});
        }
        else{
            res.send({result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({msg: 'Some Thing Went Wrong!'}); 
    }
};


const userlogin = async (req, res) => {
    try {

        const getUser = await users.checkuserexist({username:req.body.username});
        console.log("getUser",getUser)

        if(getUser.length === 0)
        {
            res.send({ status: 400, result: "Failure", message: 'User Not Found!'}); 
            return false 
        }
     
        const passwordCheck = await bcrypt.compare(req.body.password, getUser[0].password);
        console.log("passwordCheck",passwordCheck);
        if (passwordCheck) { 
            const token = JWT.sign({ id: getUser[0].id,email:getUser[0].email }, process.env.JWT_SECRET_KEY);
            res.send({message: "LoggedIn Successfully!", accessToken: token });
        } else { 
            res.send({message: "Incorrect Password!" });
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


module.exports = {
    createUser,
     userlogin,

};