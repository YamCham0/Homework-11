const { readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');
const fs = require('fs');
const { v4: uuidv4} = require('uuid');
const path = require('path');
const db = require('../db/db.json');
const notes = require('express').Router();



//GET
notes.get('/', (req, res) =>{
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});





// Post
notes.post('/', (req, res) => {
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

notes.delete('/:db_id', (req, res) => {
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


module.exports = notes;