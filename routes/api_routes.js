// all my dependcies needed to make the page work
const fs = require('fs');
const uuid = require('../utils/uuid');
const api = require('express').Router();

// any get request made to /notes comes in here
api.get('/notes', (request, response) => {
    console.log('Processing Get request')

    // get the data from the db file, read it, and parse it
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    console.log(`Get request - Returning notes data:  ${JSON.stringify(data)}`);

    // the response updates the html page with the notes read
    response.json(data);
});

// any post requests to the /notes comes in here
api.post('/notes', (request, response) => {

    // we create a newNote variable that is equal to the request's body upon hitting the save button
    const newNote = request.body;
    console.log(`POST request - New Note:  ${JSON.stringify(newNote)}`);

    // here we give the newNote a random id
    newNote.id = uuid();

    // we then grab the db file data, read it, and parse the information
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    // once we have the information, we push our newNote into the array
    data.push(newNote);

    // we then write the array containing our newNote back to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    console.log("Succesfully added the new note to 'db.json'!");

    // once that has been complete, we run the response which allows the page to update with the saved notes
    response.json(data);
});

// any delete requests to /notes comes here
api.delete('/notes/:id', (request, response) => {

    // get the note by the assigned id
    let noteId = request.params.id;
    console.log(`DELETE request recieved for id: ${noteId}`);

    // grab the current data from the db file
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));

    // create a new array that contains all the notes inside apart from the note with the matching id to the one we're filtering
    const newData = data.filter(note => note.id !== noteId);

    // write the new array back to the db file
    fs.writeFileSync('./db/db.json', JSON.stringify(newData));

    // once completed, we run the response that updates the html page
    response.json(true);
});

// export the routes to the server.js file
module.exports = api;