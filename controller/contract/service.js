'use strict';
const mongoose = require('mongoose');

var uuid = require('uuid-random');
const contractSchema = mongoose.Schema({
    contractName:String,
    address:String,
    contractStatus:{
        type:String,
        enum: ["DRAFT", "ACTIVE"],
        default: "ACTIVE",
    },
    totalAmount: String,
    respondentInfo:Object,
    createdAt:String,
});

const model = mongoose.model('contracts', contractSchema);


const createContract = async(data) => {
    console.log("data",data);
    try {
        data.respondentInfo.respondentId = uuid();
        const contract = new model(data);
        const savedata = await contract.save();
        return savedata;
    } catch(err) {
        return false
    }
};


const getContract = async(contractId) => {
    console.log("data",contractId);
    try {
        if(contractId){
            console.log("data",contractId);
            let contractData = await model.findOne({_id:contractId});
            return contractData;
        }
       
    } catch(err) {
        return false
    }
};


module.exports = { 
    createContract,
    getContract
 };