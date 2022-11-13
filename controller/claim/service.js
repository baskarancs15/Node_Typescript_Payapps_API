'use strict';
const mongoose = require('mongoose');



const claimantSchema = mongoose.Schema({
    refId:String,
    claimantName: String,
    claimantEmail:String,
    claimDescription: String,
    workPercentage:String,
    claimAmount:String,
    status:String,
    createdAt:String,
    contractId:String,
    updatedBy:String
  });

const model = mongoose.model('claimant', claimantSchema);


const saveclaimdetails = async(data) => {
    try {
        const claimant = new model(data);
        const saveclaimant = await claimant.save();
        return saveclaimant;
    } catch(err) {
        return false
    }
};


const updateClaimById = async(data) => {
    try {
         const claim = await model.updateMany(
            {"refId" : data.refId},
            {$set: {"quantity":data.quantity,
                    "status":data.status,
                    "claimAmount":data.claimAmount,
                    "createdAt": data.createdAt,
                    "updatedBy":data.respondentId
            }},
            {new : true}
        );
         return claim;
    } catch(err) {
        return false
    }
};

const getclaimdetails = async(data) => {
    try {
        console.log(data)
        let claims = await model.find({contractId:data.contractId});
        console.log(claims);
        return claims;
    } catch(err) {
        return false
    }
};



const getclaimdetail = async(data) => {
    try {
        var query=[];
        query.push({$match:{"status":"SUBMITTED"}})
        if(data.refId)
        {
            query.push({$match: { refId: data.refId }});
        }
        let claim = await model.aggregate([query]);
        return claim[0];
    } catch(err) {
        return false
    }
};

module.exports = { 
    saveclaimdetails,
    updateClaimById,
    getclaimdetail,
    getclaimdetails
 };