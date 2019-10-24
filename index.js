const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const databaseConnect = require('./database');

const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const port = process.env.PORT || 3002;

databaseConnect();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/dist')));

app.use(
  cors({
    origin: true
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/api/v1', require('./routes'));
app.use('/api/v1/users', require('./routes/user'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist/index.html'));
});

app.listen(port, () =>
  console.log(`App is running at http://localhost:${port}`)
);
