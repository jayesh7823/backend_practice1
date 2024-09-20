const { ObjectId } = require('mongodb');
const connectDB = require('../db/DbConnect');


async function DeleteProduct(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("productCollection");
        const {pid} = req.body;
        const result = await collection.deleteOne({_id: new ObjectId(pid)});
        if(result.deletedCount === 0){
            return res.status(404).json({message: "Product Not Found"})
        }else {
            return res.status(200).json({message: "product deleted successfully"});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

async function UpdateProduct(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("productCollection");
        const {pid, name, price, description} = req.body;
        const image = req.file ? req.file.filename : null;
        const product =  collection.findOne({pid});
        if(!product){
            return res.status(404).json({message: "product not found"})
        }

        const result = await collection.updateOne(
            {_id: new ObjectId(pid)},
            {$set: {name, price, description, image: image || product.image}}
        );
        if(result.modifiedCount > 0){
            return res.status(200).json({message: "Product Updated Successfully"})
        }else {
            return res.status(404).json({message: "product Not Found"});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {DeleteProduct, UpdateProduct};