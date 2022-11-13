const express = require("express");
const router = express.Router();
const contract = require("../controller/contract/index");
const claim = require("../controller/claim/index");


let routes = (app) => {

  //Contract Creation 
  router.post("/createcontract", contract.createContract);

  //fetch one contract by contractId
  router.get("/getcontractbyId/:contractId", contract.getContract);

  //Claim Creation 
  router.post("/createclaim", claim.createClaim);

  //fetch all claims under the maincontract using contractId
  router.get("/getclaims/:contractId", claim.getClaims);

  //fetch one claim by refId
  router.get("/getclaim", claim.getClaim);
 
  //Respondent Operation
  router.put("/respondentAsses", claim.respondentAsses);

  app.use("/api", router);
};

module.exports = routes;