const connectDB = require('../db/DbConnect');


async function ShowProductsData(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("productCollection");

        const productDetails = await collection.find().toArray(); 

        if(productDetails.length == 0){
            return res.status(404).json({message:"Product Data Not Found"});
        } else {
            return res.status(200).json({message:"SUCCESS", proData: productDetails});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {ShowProductsData};