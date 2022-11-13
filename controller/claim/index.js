'use strict';


const claim = require('./service');
var uuid = require('uuid-random');
const contract = require('../contract/service');

//create one claim under one contract
const createClaim = async (req, res) => {
    var currentDate = new Date();
    try {
        console.log("createClaim")
        console.log(req.body);
        let claimamount = parseInt(req.body.claimAmount);
        
        let checkContractData = await contract.getContract(req.body.contractId);
        let contractamount = parseInt(checkContractData.totalAmount);
        
        if(checkContractData.contractStatus!='ACTIVE'){
            return res.send({ status: 400, result: "Fail", message: 'Contract is not Active!Please claim once contract been active '});
        }

        if(contractamount < claimamount || claimamount == 0){
            return res.send({ status: 400, result: "Fail", message: 'Claim amount should be less than Contract Amount!'});
        }
        
        let claimJsonData = {
            refId:uuid(),
            claimantName: req.body.name,
            claimantEmail:req.body.claimantEmail,
            claimDescription: req.body.claimDescription,
            workPercentage:req.body.workPercentage,
            claimAmount:req.body.claimAmount,
            contractId:req.body.contractId,
            status:'DRAFT',
            date:currentDate,
            contractId:req.body.contractId,
            createdAt:currentDate.toISOString().slice(0,10) +" "+ currentDate.toISOString().slice(11,19),
        }


        const saveclaim = await claim.saveclaimdetails(claimJsonData);
        if(saveclaim){
            res.send({ status: 200, result: "Success", message: 'Claim Placed Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};
//get one claim by refId
const getClaim = async (req, res) => {
    try {

        let getclaim = await claim.getclaimdetail(req.query)
        console.log("getclaim",getclaim)

        if(getclaim)
        {
            res.send({result: "Success", data: getclaim});
        }
        else
        {
            res.send({result: "Failure", Message: 'Claim Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

//get all claims by contractId
const getClaims = async (req, res) => {
    try {
        let getclaims = await claim.getclaimdetails(req.params)
        console.log("getclaims",getclaims)
        if(getclaims.length!=0 )
        {
            res.send({result: "Success", data: getclaims});
        }
        else
        {
            res.send({result: "Failure", Message: 'Claim Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

//approve or oveerides the claim by respondent
const respondentAsses = async (req, res) => {
    try {
         console.log("respondentAsses");
         var currentDate = new Date();
         let getclaim = await claim.getclaimdetail(req.body)
        
         if(getclaim)
        {
            req.body.createdAt=currentDate.toISOString().slice(0,10) +" "+ currentDate.toISOString().slice(11,19);
            console.log("data",req.body)
            console.log("getclaim",getclaim)

            let updateclaim = await claim.updateClaimById(req.body)
            if(updateclaim)
            {
                res.send({ status: 200, result: "Success", message: 'Claim Updated Successfully!'});
            }
            else
            {
                res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
            }
        }
        else
        {
            res.send({ status: 400, result: "Failure", Message: 'Claim Not Found!'});

        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


module.exports = {
    createClaim,
    getClaim,
    getClaims,
    respondentAsses
};