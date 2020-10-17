import { json } from "body-parser";
import firebaseSetUp from "../util/firebaseSetUp";
const firebase = require("firebase");
firebase.initializeApp(firebaseSetUp.firebaseConfig);
const storage = firebase.storage();

const apiEndPoint = "http://localhost:5001/diving-app-eaabe/us-central1/app";

const myAPI = {
  async fetchSpot(spotID) {
    const response = await fetch(`${apiEndPoint}spot?spotID=${spotID}`);
    console.log("response", response);

    const jsonResponse = await response.json(); // turns a JSON string into an Object
    console.log("jsonresponse", jsonResponse);

    if (jsonResponse) {
      return jsonResponse;
    }
  },

  async postNewSpot(spotInfo) {
    const response = await fetch(`${apiEndPoint}/writeInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotInfo, null, "  "), 
    })

    let jsonRes = response;

      if (jsonRes){
        return jsonRes;
       } else {
         return 'No jsonRes available';
       };
   
         
     
    
  },

  async uploadSpotImage(fileArray = []) {
    const res = await Promise.all(
      fileArray.map((val) => {
        return uploadImageAsPromise(val);
      })
    );
    return res;

    function uploadImageAsPromise(file) {
      return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(`images/${file.name}`);

        var task = storageRef.put(file);

        task.on(
          "state_changed",
          function progress(snapshot) {
            // var percentage =
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // uploader.value = percentage;
          },
          function error(err) {
            console.log("error on uploadSpotImage: ", err);
          },
          function complete() {
            storageRef.getDownloadURL().then((url) => {
              resolve(url);
            });
          }
        );
      });
    }
  },
};

export default myAPI;
