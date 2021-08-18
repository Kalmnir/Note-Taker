const express = require('express');
const api = require('./routes/api_routes');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.use('/api', api);

app.listen(PORT, function () {
    console.log(`App is listening on PORT: ${PORT}`)
});