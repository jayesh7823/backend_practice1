const connectDB = require('../db/DbConnect');


async function AddSignUpData(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("signUpCollection");

        const {name, email, phone, password, address} = req.body;

        const checkUser = await collection.findOne({email});

        if(checkUser){
            return res.status(400).json({message: "Email Already in use"});
        }

        await collection.insertOne({
            name,
            email,
            password,
            phone,
            address
        });
        return res.status(200).json({message: "Registered Successfully"});
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {AddSignUpData};