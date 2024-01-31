const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

var url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "swapi";


app.get('/', (req, res) => {
    res.send('SWAPI MERN Express Server');
});

async function getCollection(name) {
    await client.connect();
    const db = client.db(dbName)
    return db.collection(name);
}

// -----------------------------------------------
// ------------------ PLANETS --------------------
// -----------------------------------------------

app.get('/api/planets', async (req,res) => {
    const collection = await getCollection("planets")
    const item = await collection.find().toArray()
    res.send(item)
})

app.get('/api/planets/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    const collection = await getCollection("planets")
    const item = await collection.find({"id": id}).toArray()
    res.send(item)
})

app.get('/api/planets/:id/films', async (req,res) => {
    const { id } = req.params;
    const collection = await getCollection("planets")
    const item = await collection.find({"id": id}).toArray()
    res.send(item)
})

app.get('/api/planets/:id/characters', async (req,res) => {
    const { id } = req.params;
    const collection = await getCollection("planets")
    const item = await collection.find({"id": id}).toArray()
    res.send(item)
})

// -----------------------------------------------
// ---------------- CHARACTERS -------------------
// -----------------------------------------------

app.get('/api/characters', async (req,res) => {
    const collection = await getCollection("characters")
    const item = await collection.find().toArray()
    res.send(item)
})

app.get('/api/characters/:id', async (req,res) => {
    const collection = await getCollection("characters")
    const item = await collection.find({"id": id}).toArray()
    res.send(item)
})


app.get('/api/characters/:id/films', async (req,res) => {
    const { id } = req.params;
    const collection = await getCollection("characters")
    const item = await collection.find({"id": id}).toArray()
    res.send(item)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
