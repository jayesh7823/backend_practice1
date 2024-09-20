const {MongoClient} = require('mongodb')
require('dotenv').config();

const url = process.env.DATABASE1;
const url2 = process.env.DATABASE2;
const client = new MongoClient(url);

async function ConnectToDatabase(){
    try {
        await client.connect();
        console.log("DbConnected!");
        // const database = client.db("mvSchool");
        const database = client.db("ecommerce");
        return database;
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = ConnectToDatabase;