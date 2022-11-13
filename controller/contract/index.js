'use strict';

const contracts = require('./service');


const createContract = async (req, res) => {
    try {
        var date = new Date();
        req.body.createdAt=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
        const savecontract = await contracts.createContract(req.body)
        if(savecontract){
            res.send({result: "Success", message: 'Contract Added Successfully!'});
        }
        else{
            res.send({result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({msg: 'Some Thing Went Wrong!'}); 
    }
};

const getContract = async (req, res) => {
    try {
        let contractData = await contracts.getContract(req.params.contractId)
        if(contractData){
            res.send({result: "Success", message: 'Contract Fetched Successfully!',data: contractData});
        }
        else{
            res.send({result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({msg: 'Some Thing Went Wrong!'}); 
    }
};





module.exports = {
    createContract,
    getContract
};