'use strict';
const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    productid: String,
    code: String,
    name: String,
    price: Number,
    qty:Number,
    createdAt:String,
  });

const model = mongoose.model('products', productSchema);


const createproductsdetails = async(data) => {
    try {

        const product = new model(data);
        const savedata = await product.save();
        return savedata;
    } catch(err) {
        return false
    }
};

const getProductDetails = async(data) => {
    try {

        var query=[];
        var product;

        if(data.code)
        {
           query.push({$match:{"code":data.code}});
           product = await model.aggregate([
               query
           ]);
        }
         return product;
    } catch(err) {
        return false
    }
};

const updateproductdetails = async(data) => {
    try {
         const users = await model.updateMany(
            {"code" : data.code},
            {$set: {"name":data.name,
                    "price":data.price,
                    "qty" : true,
                    "createdAt": data.createdAt}},
            {new : true}
        );

         return users;
    } catch(err) {
        return false
    }
};

module.exports = { 
    createproductsdetails,
    getProductDetails,
    updateproductdetails

 };