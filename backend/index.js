const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

let filmovi = [
  {
    id: 1,
    naziv: 'Inception',
    godina: 2010,
    opis: 'Sci-fi triler o snovima.',
    zanr: 'Sci-Fi'
  },
  {
    id: 2,
    naziv: 'The Matrix',
    godina: 1999,
    opis: 'Haker otkriva stvarnost.',
    zanr: 'Akcija'
  },
  {
    id: 3,
    naziv: 'Interstellar',
    godina: 2014,
    opis: 'Putovanje kroz crvotočinu.',
    zanr: 'Sci-Fi'
  },
  {
    id: 4,
    naziv: 'Gladiator',
    godina: 2000,
    opis: 'Rimski general postaje gladijator.',
    zanr: 'Povijesni'
  },
  {
    id: 5,
    naziv: 'The Godfather',
    godina: 1972,
    opis: 'Priča o mafijaškoj obitelji.',
    zanr: 'Kriminalistički'
  },
  {
    id: 6,
    naziv: 'Titanic',
    godina: 1997,
    opis: 'Ljubavna priča na potonulom brodu.',
    zanr: 'Romansa'
  },
  {
    id: 7,
    naziv: 'Avatar',
    godina: 2009,
    opis: 'Futuristička planeta Pandora.',
    zanr: 'Fantastika'
  },
  {
    id: 8,
    naziv: 'Shrek',
    godina: 2001,
    opis: 'Ogr u potrazi za privatnošću.',
    zanr: 'Animirani'
  },
  {
    id: 9,
    naziv: 'The Dark Knight',
    godina: 2008,
    opis: 'Batman protiv Jokera.',
    zanr: 'Akcija'
  },

  {
    id: 10,
    naziv: 'Forrest Gump',
    godina: 1994,   
    opis: 'Život običnog čovjeka kroz povijest.',
    zanr: 'Drama'
  }

];

// GET endpoint za dohvat svih filmova
app.get('/api/filmovi', (req, res) => {
  res.json(filmovi);
});

// POST endpoint za dodavanje novog filma
app.post('/api/filmovi', (req, res) => {
  const noviFilm = req.body;
  noviFilm.id = filmovi.length + 1;
  filmovi.push(noviFilm);
  res.status(201).json(noviFilm);
});

// Testni endpoint
app.get('/', (req, res) => {
  res.send('Backend radi!');
});

app.listen(port, () => {
  console.log(`✅ Backend radi na http://localhost:${port}`);
});
