const functions = require('firebase-functions');
const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors({ origin: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log('Got in touch with middleware')

    next();
 })

app.get('/', (req, res) => {
    console.log('Got in touch with "/"')
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.send('API is working');
  });

  app.get('/api', (req, res) => {
    const date = new Date();
    const hours = (date.getHours() % 12) + 1;  // London is UTC + 1hr;
    res.json({bongs: 'BONG '.repeat(hours)});
  });

  exports.app = functions.https.onRequest(app);