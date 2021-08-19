// list of dependencies
const express = require('express');
const api = require('./routes/api_routes');
const path = require('path');

// run our app using express function and set up our port using heroku and local host
const app = express();
const PORT = process.env.PORT || 3001;

// middleware for allowing text on post requests and setting up the homepage
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set the main hompage link
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

// set the notes page link
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// set the link that uses our imported api routes to link to the page anytime there is a call made
app.use('/api', api);

// set up to listen for activity and run our app
app.listen(PORT, function () {
    console.log(`App is listening on PORT: ${PORT}`)
});