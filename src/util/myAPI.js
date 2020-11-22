import { json } from "body-parser";
import { UserDimensions } from "firebase-functions/lib/providers/analytics";
import firebase from "./firebaseSetUp.js";
const storage = firebase.storage();

const apiEndPoint = "http://localhost:5001/diving-app-eaabe/us-central1/app";
// const apiEndPoint = "https://us-central1-diving-app-eaabe.cloudfunctions.net/app";

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

  async uploadSpotImage(fileArray = [], folderName) {
    const res = await Promise.all(
      fileArray.map((val) => {
        return uploadImageAsPromise(val);
      })
    );
    return res;

    function uploadImageAsPromise(file) {
      return new Promise(function (resolve, reject) {
        var storageRef = storage.ref(`${folderName}/${file.name}`);

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
        })
        .catch((e) => {
          return e;
        });
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

  async fetchSpotList(paramsURL, queryBounds, quantity) {
    try {
      let neLat;
      let neLng;
      let nwLat;
      let nwLng;
      let seLat;
      let seLng;
      let swLat;
      let swLng;

      // When no map loads at initialization (Phone/Tablet view )
      if (!queryBounds){
        let margin = 0.2;
        let params = new URLSearchParams(paramsURL);
        let lat = params.get('lat')
        let lng = params.get('lng')

          neLat = parseFloat(lat) + margin;
          neLng = parseFloat(lng) + margin;
          nwLat = neLat;
          nwLng = parseFloat(lng) - margin;
          seLat = parseFloat(lat) - margin;
          seLng = neLng;
          swLat = seLat;
          swLng = nwLng;
    } else {
         neLat = queryBounds.ne.lat;
         neLng = queryBounds.ne.lng;
         nwLat = queryBounds.nw.lat;
         nwLng = queryBounds.nw.lng;
         seLat = queryBounds.se.lat;
         seLng = queryBounds.se.lng;
         swLat = queryBounds.sw.lat;
         swLng = queryBounds.sw.lng;
    }
     

      const response = await fetch(
        `${apiEndPoint}/search?${paramsURL}&neLat=${neLat}&neLng=${neLng}&nwLat=${nwLat}&nwLng=${nwLng}&seLat=${seLat}&seLng=${seLng}&swLat=${swLat}&swLng=${swLng}&qty=${quantity}`
      );

      if (response) {
        return response.json();
      }
    } catch (error) {
      console.error(error);
      return "err/connection_refused";
    }
  },
};

export default myAPI;
