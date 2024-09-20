const connectDB = require('../db/DbConnect');


async function AddProductsData(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("productCollection");
        const {name, price, description} = req.body;
        const image = req.file ? req.file.filename : null;

        await collection.insertOne({
            name,
            price,
            description,
            image
        })

        return res.status(200).json({message: "Product Data inserted"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {AddProductsData};