const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const databaseConnect = require('./database');
const connectRedis = require('./redis');

const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3002;
const REDIS_URL =
  'redis://h:pba90327a680b301f1819d4765f1a5435d521964339bdb514490d5767f4de9671@ec2-34-199-192-253.compute-1.amazonaws.com:16199' ||
  'redis://127.0.0.1:6379';

databaseConnect();
connectRedis(REDIS_URL);

app.use(
  cors({
    origin: true
  })
);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/v1', require('./routes'));
app.use('/api/v1/users', require('./routes/user'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

const server = app.listen(port, () =>
  console.log(`App is running at http://localhost:${port}`)
);

module.exports = server;
