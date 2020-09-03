const firebase = require("firebase");
const functions = require("firebase-functions");
const auth = require("firebase/auth");
const firebaseSetUp = require("../src/util/firebaseSetUp.js");
firebaseSetUp.firebaseConfig; // Make firebase identifiers available to initialize app
firebase.initializeApp(firebaseConfig);

const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var db = firebase.database();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors({ origin: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/read", (req, res) => {
  let data;
  var testLoc = db.ref("test/one");

  testLoc.on("value", function (snapshot) {
    data = snapshot.val();
    console.log(data);
  });
  res.send(data);
});

app.get("/spot", (req, res) => {
  let data;
  var spotData = db.ref(`spot-list/${req.query.spotID}`);

  spotData.on("value", function (snapshot) {
    data = snapshot.val();
    console.log(data);
  });
  res.send(data);
});

app.post("/write", (req, res) => {
  console.log(req.body);
  var newPostKey = db.ref().child("test").push().key;
  var updates = {};
  updates["spot-list/" + newPostKey] = req.body;
  console.log(updates);
  db.ref().update(updates);
  res.end();
});

exports.app = functions.https.onRequest(app);
