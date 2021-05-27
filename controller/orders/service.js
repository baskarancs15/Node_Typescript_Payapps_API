'use strict';
const mongoose = require('mongoose');



const orderSchema = mongoose.Schema({
    orderId: String,
    name: String,
    quantity: Number,
    price: Number,
    totalprice:Number,
    address:String,
    status:String,
    email:String,
    userName:String,
    createdAt:String,
    productId:String
  });

const model = mongoose.model('orders', orderSchema);


const saveorderdetails = async(data) => {
    try {
        const order = new model(data);
        const saveorder = await order.save();
        return saveorder;
    } catch(err) {
        return false
    }
};

const  cancelorderdetails= async(data) => {
    try {
         const users = await model.updateMany(
            {"orderId" : data.orderId},
            {$set: {"status":"CANCELLED",
                    "createdAt": data.createdAt}},
            {new : true}
        );
         return users;
    } catch(err) {
        return false
    }
};

const updateorderdetails = async(data) => {
    try {
         const users = await model.updateMany(
            {"orderid" : data.orderid},
            {$set: {"quantity":data.quantity,
                    "totalprice":data.totalprice,
                    "address":data.address,
                    "createdAt": data.createdAt}},
            {new : true}
        );
         return users;
    } catch(err) {
        return false
    }
};

const getorderdetail = async(data) => {
    try {

        // console.log("orderDetails",data);
        var order;
        var query=[];
        query.push({$match:{"status":"ORDERED"}})

        if(data.orderId)
        {
            query.push({$match: { orderId: data.orderId }});
        }
        if(data.searchdata)
        {
            query.push({$match: { $or: [{ name: data.searchdata },
                                        { email: data.searchdata },
                                        { userName: data.searchdata }
                                    ] }})
        }
        if(data.sortvalue)
        {
            query.push({ $sort : { createdAt: parseInt(data.sortvalue) } })
        }

        order = await model.aggregate([
                query
        ]);
        
         return order;
    } catch(err) {
        return false
    }
};

const getorderedcountdetails = async() => {
    try {

        var orderproductcount;

        orderproductcount = await model.aggregate([
                {$match:{status:"ORDERED"}},
                {
                    $group: {
                      _id: { date: { $substr: [ "$createdAt", 0, 10 ] },name: "$name" },
                     count: { $sum: 1 }
                    }
                }
            ]);

         return orderproductcount;
    } catch(err) {
        return false
    }
};

const viewpurchesedcountdetails = async() => {
    try {

        var customerproductcount;

        customerproductcount = await model.aggregate([
            {$match:{status:"COMPLETED"}},
            {
                $group: {
                  _id: { customername:"$userName" },
                 count: { $sum: 1 }
                }
            }
            ]);

         return customerproductcount;
    } catch(err) {
        return false
    }
};


module.exports = { 
    saveorderdetails,
    updateorderdetails,
    cancelorderdetails,
    getorderdetail,
    viewpurchesedcountdetails,
    getorderedcountdetails
  
 };