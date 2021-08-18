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



module.exports = api;