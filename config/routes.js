const express = require("express");
const router = express.Router();
const product = require("../controller/products/index");
const user = require("../controller/users/index");
const order = require("../controller/orders/");
const authToken = require("./authToken");
const upload = require("../multerupload/upload");

let routes = (app) => {
  //Product upload
  router.post("/upload",authToken, upload.single("productfile"), product.fileupload);
  
  //User Creation 
  router.post("/createuser", user.createUser);
  router.post("/userlogin", user.userlogin);
  
  //Order Operation
  router.post("/createorder",authToken ,order.createorder);
  router.post("/updateorder", authToken, order.updateorder);
  router.post("/cancelorder",authToken, order.cancelorder);

  //Get Order Details
  router.get("/getorder",authToken,order.getorders);
  router.get("/getorderedcountbydate",authToken,order.getorderedproductcountbydate);
  router.get("/getpurchasedcountbycustomer",authToken,order.getpurchesedproductcountbycustomer);

  app.use("/api", router);
};

module.exports = routes;