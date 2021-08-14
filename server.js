const express = require('express');
const fs = require('fs');
const api = require('./routes/api_routes');

const app = epress();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);