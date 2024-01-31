const { MongoClient, ConnectionPoolClosedEvent } = require('mongodb');
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
// ------------------- FILMS ---------------------
// -----------------------------------------------

// Films
app.get('/api/films', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const filmsCollection = db.collection("films");
    const films = await filmsCollection.find({}).toArray();
    res.json(films);
  });
  
  // Films ID
  app.get('/api/films/:id', async (req, res) => {
    const filmId = parseInt(req.params.id);
    await client.connect();
    const db = client.db(dbName);
    const filmsCollection = db.collection("films");
    const film = await filmsCollection.findOne({ id: filmId });
    res.json(film);
  });
  
  //Characters by film ID
  app.get('/api/films/:id/characters', async (req, res) => {
    const filmId = parseInt(req.params.id);
    await client.connect();
    const db = client.db(dbName);
    const charactersCollection = db.collection('characters');
    const characters = await charactersCollection.find({ filmId: filmId }).toArray();
    res.json(characters);
  });
  
  //Planets by film 
  app.get('/api/films/:id/planets', async (req, res) => {
    const filmId = parseInt(req.params.id);
    await client.connect();
    const db = client.db(dbName);
    const planetsCollection = db.collection('planets'); // Adjust collection name as needed
    const planets = await planetsCollection.find({ filmId: filmId }).toArray();
    res.json(planets);
  });

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
