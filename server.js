const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.port || 3000;
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile} = require('./helpers/fsUtils');
const db = require('./db/db.json');


// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// GET Route for homepage
app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes page
app.get('/notes', (req, res) => {
res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('/api/notes', (req, res) =>{
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});



// Post

app.post('/api/notes', (req, res) => {
const {title, text} = req.body;
    if (req.body) {
        const newNote = {
            title, 
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json')
        res.json("Yay!")
    }else{
        res.status(404).send("Error!")
    }
});

// Delete

app.delete('/api/notes/:db_id', (req, res) => {
    const dbId = req.params.db_id;
    readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((db) => db.id !== dbId);

        // Save that array to the filesystem
        writeToFile('./db/db.json', result);

        // Respond to the DELETE request
        res.json(`Item ${dbId} has been deleted 🗑️`);
    });
});





app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT} 🚀`)
);
