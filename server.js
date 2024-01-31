const { MongoClient, ConnectionPoolClosedEvent } = require('mongodb');
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

// Films
app.get('/api/films', async (req, res) => {
    await client.connect();
    const db = client.db(dbName);
    const filmsCollection = db.collection(collectionName);
    const films = await filmsCollection.find({}).toArray();
    res.json(films);
  });
  
  // Films ID
  app.get('/api/films/:id', async (req, res) => {
    const filmId = parseInt(req.params.id);
    await client.connect();
    const db = client.db(dbName);
    const filmsCollection = db.collection(collectionName);
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
  
  //Planets by film ID
  app.get('/api/films/:id/planets', async (req, res) => {
    const filmId = parseInt(req.params.id);
    await client.connect();
    const db = client.db(dbName);
    const planetsCollection = db.collection('planets'); // Adjust collection name as needed
    const planets = await planetsCollection.find({ filmId: filmId }).toArray();
    res.json(planets);
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
