const { MongoClient, ConnectionPoolClosedEvent } = require('mongodb');
const express = require('express');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;


const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.static('./public'))

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

  async function getFilmCharacters(objs) {
    return Promise.all(objs.map(async (obj) => {
        const collection = await getCollection("characters")
        let character = await collection.findOne({"id": obj.character_id})
        return character
    }))
}
  
  //Characters by film 
  app.get('/api/films/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    let collection = await getCollection("films_characters")
    const objs = await collection.find({"film_id": id}).toArray()
    let characters = await getFilmCharacters(objs)
    res.send(characters)
  });
  
async function getFilmPlanets(objs) {
    return Promise.all(objs.map(async (obj) => {
        const collection = await getCollection("planets")
        let planet = await collection.findOne({"id": obj.planet_id})
        return planet
    }))
}
  
  //Planets by film 
  app.get('/api/films/:id/planets', async (req, res) => {
    const id = parseInt(req.params.id);
    let collection = await getCollection("films_planets")
    const film_planet_objs = await collection.find({"film_id": id}).toArray()
    let planets = await getFilmPlanets(film_planet_objs)
    res.send(planets)
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
    const item = await collection.findOne({"id": id})
    res.send(item)
})

async function getPlanetFilms(objs) {
    return Promise.all(objs.map(async (obj) => {
        const collection = await getCollection("films")
        let film = await collection.findOne({"id": obj.film_id})
        return film
    }))
}
  
  //Characters by film 
  app.get('/api/planets/:id/films', async (req, res) => {
    const id = parseInt(req.params.id);
    let collection = await getCollection("films_planets")
    const objs = await collection.find({"planet_id": id}).toArray()
    let films = await getPlanetFilms(objs)
    res.send(films)
  });

  async function getPlanetCharacters(objs) {
    return Promise.all(objs.map(async (obj) => {
        const collection = await getCollection("characters")
        let character = await collection.find({"id": obj.character_id})
        return character
    }))
}
  
  //Characters by film 
  app.get('/api/planets/:id/characters', async (req, res) => {
    const id = parseInt(req.params.id);
    let collection = await getCollection("characters")
    let characters = await collection.find({"homeworld": id}).toArray()
    console.log(characters)
    res.send(characters)
  });

app.get('/api/planets/:id/characters', async (req,res) => {
    const id = parseInt(req.params.id);
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
    const id = parseInt(req.params.id);
    const collection = await getCollection("characters")
    const item = await collection.findOne({"id": id})
    res.send(item)
})

async function getCharacterFilms(film_char_objs) {
    return Promise.all(film_char_objs.map(async (fc_obj) => {
        const collection = await getCollection("films")
        let film = await collection.findOne({"id": fc_obj.film_id})
        return film
    }))
}

app.get('/api/characters/:id/films', async (req,res) => {
    const id = parseInt(req.params.id);
    let collection = await getCollection("films_characters")
    const film_char_objs = await collection.find({"character_id": id}).toArray()
    let films = await getCharacterFilms(film_char_objs)
    res.send(films)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

