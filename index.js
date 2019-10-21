const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const databaseConnect = require('./database');

const app = express();
const port = process.env.PORT || 3002;

databaseConnect();

app.listen(port, () =>
  console.log(`App is running at http://localhost:${port}`)
);
