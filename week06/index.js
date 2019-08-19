const express = require('express');
const app = express();

// Global application state
let counter = 0;

// Parse the body of any incoming JSON request
app.use(express.json());

// ------------------------------------------------
// Static single-page front-end
// ------------------------------------------------

// Serve the static front-end
app.get('/',  (req, res) => {
    res.sendFile('index.html', {root: __dirname});
});

// ------------------------------------------------
// Endpoints
// ------------------------------------------------

// Retrieve the current state of the counter
app.get('/count', (req, res) => {
    res.send({count: counter});
});

// Adjust the counter using the supplied 'direction' key,
// and return the current state (as with /count)
app.post('/step', (req, res) => {
    counter += req.body.direction;
    res.send({count: counter});
});

// ------------------------------------------------
// Start serving
// ------------------------------------------------
server = app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
});