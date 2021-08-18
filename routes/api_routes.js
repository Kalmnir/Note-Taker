const fs = require('fs');
const uuid = require('../utils/uuid');
const api = require('express').Router();

api.get('/notes', (request, response) => {
    console.log('Processing Get request')
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    console.log(`Get request - Returning notes data:  ${JSON.stringify(data)}`);
    response.json(data);
});

api.post('/notes', (request, response) => {
    const newNote = request.body;
    console.log(`POST request - New Note:  ${JSON.stringify(newNote)}`);
    newNote.id = uuid();
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    data.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    console.log("Succesfully added the new note to 'db.json'!");
    response.json(data);
});

api.delete('/notes/:id', (request, response) => {
    let noteId = request.params.id;
    console.log(`DELETE request recieved for id: ${noteId}`);
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newData = data.filter(note => note.id !== noteId);
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));
    response.json(true);
});

module.exports = api;