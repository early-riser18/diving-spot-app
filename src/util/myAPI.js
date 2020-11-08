import { json } from "body-parser";
import { UserDimensions } from "firebase-functions/lib/providers/analytics";
import firebase from "./firebaseSetUp.js";
const storage = firebase.storage();
const apiEndPoint = "http://localhost:5001/diving-app-eaabe/us-central1/app";

let spotImgPath = "images";

const myAPI = {
  async fetchSpot(spotID) {
    console.log("fetchSpot called with: ", spotID);
    let response = await fetch(`${apiEndPoint}/spot?spotID=${spotID}`).then(
      (res) => {
        if (res.ok) {
          return res.json();
        } else {
          return undefined;
        }
      },
      (err) => {
        return undefined;
      }
    );
    return response;

  
  },

  async postNewSpot(spotInfo) {
    const response = await fetch(`${apiEndPoint}/writeInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(spotInfo, null, "  "),
    }).then(
      (res) => {
        console.log(res);
        return res;
      },
      (err) => {
        console.error(err);
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
            console.error("error got triggered");
            reject(err);
          });
      });
    }
  },

  async getUserData(userID) {
    try {
      const response = await fetch(`${apiEndPoint}/userdata?uid=${userID}`)
      .then((res) => {
        return res;
      }).catch((e) => {
        return e
      })
      return response;
  
       
    
    } catch (e) {
      console.error(e);
      return e;
    }

  },

  async updateProfile(userUid, data, profileImg) {
    try {
      const response = await fetch(`${apiEndPoint}/updateProfile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            id: userUid,
            data: data,
          },
          null,
          "  "
        ),
      });
      if (response) {
        return;
      }
    } catch (e) {
      return e;
    }
  },
};

export default myAPI;
