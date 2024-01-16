const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const port = 3000

const uri = "mongodb+srv://danielvlasceanu:LjspvDLMF371XknR@cluster0.icl3deo.mongodb.net/";



app.get('/users', async (req, res) => {
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await client.connect();
        const db = client.db("testdb")
        const coll = db.collection("users");
        const allUsers = await coll.find().toArray();
        
        res.write("<html><body><ol>")

        for (let i = 0; i < allUsers.length; i++) {
            res.write(`<li>${allUsers[i]._id}, ${allUsers[i].name}</li>`);
        }

        res.write('</ol></body></html>');
        res.send();
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
})

app.get('/new', async (req, res) => {

    console.log(req.query);
    const client = new MongoClient(uri);
    try {
        console.log("Adding a user")

        await client.connect();
        const db = client.db("testdb")
        const coll = db.collection("users");
        
        const result = await coll.insertOne({
            "_id": req.query.id,
            "name": req.query.name
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
