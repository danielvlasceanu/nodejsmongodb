const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const port = 3000

const uri = "mongodb+srv://danielvlasceanu:LjspvDLMF371XknR@cluster0.icl3deo.mongodb.net/";


async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

app.get('/list', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

app.get('/new', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        console.log("Adding a user")

        await client.connect();
        const db = await client.db("testdb")
        const coll = await db.collection("users");
        
        const result = await coll.insertOne({
            "_id": "222",
            "name": "Ana Vlasceanu"
        });
        console.log(`New listing created with the following id: ${result.insertedId}`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})


app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
})
