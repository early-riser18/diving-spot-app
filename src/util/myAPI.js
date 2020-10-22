import { json } from "body-parser";
import firebaseSetUp from "../util/firebaseSetUp";
const firebase = require("firebase");
firebase.initializeApp(firebaseSetUp.firebaseConfig);
const storage = firebase.storage();

const apiEndPoint = "http://localhost:5001/diving-app-eaabe/us-central1/app";

let spotImgPath = "images";

const myAPI = {
  async fetchSpot(spotID) {
    console.log("fetchSpot called with: ", spotID);
    let response = await fetch(`${apiEndPoint}/spot?spotID=${spotID}`)
      .then((res) => {
        if(res.ok) {
         return res.json()
        } else {
         return undefined;
        }
      },
      (err) => {
        return undefined
      });
    return response;

    // const jsonResponse = await response.json(); // turns a JSON string into an Object
    // console.log("jsonresponse", jsonResponse);

    // if (jsonResponse) {
    //   return jsonResponse;
    // }
  },

  async postNewSpot(spotInfo) {
    const response = await fetch(`${apiEndPoint}/writeInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotInfo, null, "  "),
    }).then((res) => {
      console.log(res);
      return res;
    },
    (err) => {
      console.log(err.constructor.name);
      return err;
    }
    );

    let jsonRes = response;

    if (jsonRes) {
      return jsonRes;
    } else {
      return "No jsonRes available";
    }
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
        var storageRef = storage.ref(`${spotImgPath}/${file.name}`);

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

  async cancelUploadSpotImage(fileArray = []) {
    console.log("FileArray is: ", fileArray);
    const res = await Promise.all(
      fileArray.map((val) => {
        return cancelUploadImageAsPromise(val);
      })
    );
    return res;

    function cancelUploadImageAsPromise(file) {
      return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(`${spotImgPath}/${file.name}`);

        storageRef
          .delete()
          .then((res) => {
            resolve("OK");
          })
          .catch((err) => {
            console.log("error got triggered");
            reject(err);
          });
      });
    }
  },
};

export default myAPI;
