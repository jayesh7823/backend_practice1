const connectDB = require('../db/DbConnect');


async function AddContactUsData(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("contactUsCollection");

        const {name, email, phone, message} = req.body;

        await collection.insertOne({
            name,
            email,
            phone,
            message
        });

        return res.status(200).json({message: "ContactUs Data Inserted"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {AddContactUsData};