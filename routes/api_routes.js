const fs = require('fs');
const notes = require('../db/db.json');
const api = require('express').Router();

api.get('/notes', (request, response) => {
    console.log('Processing Get request')
    let data = JSON.parse(fs.readFileSync(notes, 'utf8'));
    console.log(`Get request - Returning notes data:  ${JSON.stringify(data)}`);
    response.JSON(data);
});