const session = require('express-session');
const connectDB = require('../db/DbConnect');


async function CheckLoginActivity(req, res){
    try {
        const db = await connectDB();
        const collection  = db.collection("signUpCollection");

        const {email, password} = req.body;

        const userDetails = await collection.findOne({email, password});

        if(!userDetails){
            const userDetails2 = await collection.findOne({phone: email, password});
            if(!userDetails2){
                return res.status(404).json({message: "user not found, Invalid username or password"});
            } else{
                req.session.user = {session : userDetails2, isAuth: true}
                return res.status(200).json({message: "Logged In", data: userDetails2});
            }
        } else {
            req.session.user = {session : userDetails, isAuth: true}
            return res.status(200).json({message: "Logged In", data: userDetails});
        }
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

module.exports = {CheckLoginActivity};