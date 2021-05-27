'use strict';

const httpErrors = require('http-errors');
const order = require('./service');
var uuid = require('uuid-random');
const JWT = require('jsonwebtoken');
const prod = require("../products/index");
const products = require('../products/service');


const createorder = async (req, res) => {
    var currentDate = new Date();
    try {
        console.log("createOrder")
        console.log(req.body)
        let orderJsonData = {
            orderId:uuid(),
            name: req.body.name,
            quantity:req.body.quantity,
            price: req.body.price,
            totalprice: req.body.price*req.body.quantity,
            address:req.body.address,
            status:'ORDERED',
            date:currentDate,
            email:req.body.email,
            userName:req.body.userName,
            productId:req.body.productId,
            createdAt:currentDate.toISOString().slice(0,10) +" "+ currentDate.toISOString().slice(11,19),
        }

        console.log("hele",orderJsonData)

        const saveorder = await order.saveorderdetails(orderJsonData);
        if(saveorder){
            res.send({ status: 200, result: "Success", message: 'Order Placed Successfully!'});
        }
        else{
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const updateorder = async (req, res) => {
    try {
        var currentDate = new Date();
        const getorder = await order.getorderdetail({orderId:req.body.orderId})
        if(getorder.length!=0)
        {
            req.body.totalprice=getorder[0].price*req.body.quantity;
            req.body.createdAt=currentDate.toISOString().slice(0,10) +" "+ currentDate.toISOString().slice(11,19);

            const updateorder = await order.updateorderdetails(req.body)
            if(updateorder)
            {
                res.send({ status: 200, result: "Success", message: 'Order Updated Successfully!'});
            }
            else
            {
                res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
            }
        }
        else
        {
            res.send({ status: 400, result: "Failure", Message: 'Order Not Found!'});

        }

    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const cancelorder = async (req, res) => {
    try {

        var date = new Date();
        req.body.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
        const cancelorder = await order.cancelorderdetails(req.body)
        if(cancelorder)
        {
            res.send({ status: 200, result: "Success", message: 'Order Cancelled Successfully!'});
        }
        else
        {
            res.send({ status: 400, result: "Failure", Message: 'Some Thing Went Wrong!'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const getorders = async (req, res) => {
    try {

        const getorder = await order.getorderdetail(req.query)
        console.log("helo",getorder)

        if(getorder.length!=0 )
        {
            res.send({result: "Success", data: getorder});
        }
        else
        {
            res.send({result: "Failure", Message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const getorderedproductcountbydate = async (req, res) => {
    try {

        const getdata = await order.getorderedcountdetails({})

        if(getdata.length!=0)
        {
            res.send({ status: 200, result: "Success", data: getdata});
        }
        else
        {
            res.send({ status: 400, result: "Failure", Message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};

const getpurchesedproductcountbycustomer = async(req, res) => {
    try {

        const getdata = await order.viewpurchesedcountdetails({})

        if(getdata.length!=0)
        {
            res.send({ status: 200, result: "Success", data: getdata});
        }
        else
        {
            res.send({ status: 400, result: "Failure", Message: 'Orders Not Found'});
        }
    } catch(err) {
        res.send({ status: 400, msg: 'Some Thing Went Wrong!'}); 
    }
};


module.exports = {
     createorder,
     updateorder,
     cancelorder,
     getorders,
     getorderedproductcountbydate,
     getpurchesedproductcountbycustomer
};