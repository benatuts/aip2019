// This code based on the ExpressJS tutorial
// https://expressjs.com/en/starter/hello-world.html

const express = require('express');
const app = express();
const port = 8080;

app.get('/', express.static('./resources'));

app.listen(port, () => console.log(`App listening on http://localhost:${port}/`));