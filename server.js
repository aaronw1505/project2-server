const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "swapi";
const collectionName = "films";


app.get('/', (req, res) => {
    res.send('SWAPI MERN Express Server');
});

app.get('/api/planets', async (req,res) => {
    await client.connect();
    const db = client.db(dbName)
    const collection = db.collection(collectionName);
    console.log(await collection.find({}).toArray())
    res.send({'test': true})
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
