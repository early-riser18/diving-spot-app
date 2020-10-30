// const firebase = require("firebase");
const firebase = require('../src/util/firebaseSetUp');
// firebase.initializeApp(firebaseSetup.firebaseConfig);
const functions = require("firebase-functions");
const storage = require('firebase/storage');
// const storage = firebase.storage();

const express = require("express"); 
const app = express();
var bodyParser = require("body-parser");
var db = firebase.database();
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

const cors = require("cors");
const { response } = require("express");
const { default: dataToDisplay } = require("../src/util/dataToDisplay.js");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
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

  testLoc.on("value", (snapshot) =>  {
    data = snapshot.val();
    console.log(data);
  });
  res.send(data);
});

app.get("/spot", (req, res) => {
  let data;
  var spotData = db.ref(`spot-list/${req.query.spotID}`);

  spotData.on("value", (snapshot) => {
    data = snapshot.val();
  });

  if (data){
    res.send(data);
 } else{
   res.status(404).send({body: 'unable to reach the spot'})
 }
});

app.post("/writeInfo", (req, res) => {
  console.log(req.body);
  try {
    var newPostKey = db.ref().child("test").push().key;
    var updates = {};
    updates["spot-list/" + newPostKey] = req.body;
    console.log(updates);
    db.ref().update(updates,
     (result) => {
       if (result === null) {
        res.send({ body: 'Data successfully submitted at:', newPostKey });

       } else if (result !== null) {
        res.status(400).send({message: 'Unable to submit your request, please make sure you are logged in'});
  } 
     });
    // res.send({ body: 'Data successfully submitted at:', newPostKey });
  } catch (error) {
    res.status(500).send({error: error});
  }
  
});



app.post("/writeImg", (req, res) => {


// const uploadTask = firebase.storage().ref(`images/${Object.keys(req.body)[0]}`).put(Object.values(req.body)[0]);
// uploadTask.on(
//   "state_changed",
//   snapshot => {},
//   error => {
//     console.log(error);
//   },
//   () => {
//     storage.ref('images').child(Object.keys(req.body)[0]).getDownloadURL().then(url => console.log('Uploaded URL: ',url));
//   });

  var storageRef = firebase.storage().ref();
  var testImgRef = storageRef.child('images/testImg.png');
  // testImgRef.putString(values(req.body)[0]).then(console.log('successfully uploaded'));
   res.end();
});

exports.app = functions.https.onRequest(app);
