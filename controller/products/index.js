const product = require('./service');
const CSVToJSON = require('csvtojson');
var uuid = require('uuid-random');

const fileupload = async (req, res) => {
  console.log("file");
  try {
    if (req.file == undefined) {
      return res.status(400).send("Please upload a CSV file!");
    }

    let path = "./product_files/" + req.file.filename;
    const products = await CSVToJSON().fromFile(path);
    var date = new Date();

    products.map(async (el)=>{
      const checkExists = await product.getProductDetails({code:el.code})
      if(checkExists.length===0)
      {
        el.productid=uuid();
        el.createdOn=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
        el.isActive=true;
      const createproducts = await product.createproductsdetails(el)
      }
      else
      {
        el.createdAt=date.toISOString().slice(0,10) +" "+ date.toISOString().slice(11,19);
      const updateproduct = await product.updateproductdetails(el)

      }
    })
    res.send({ status: 200, result: "Success", message: 'Products Added Successfully!'});

  } catch (error) {
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }
};



module.exports = {
  fileupload
};