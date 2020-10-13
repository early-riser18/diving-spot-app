import { json } from "body-parser";
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

  async postNewSpot(spotInfo, spotImg) {
    let a = spotInfo;
    const response = await fetch(`${apiEndPoint}/writeInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: spotInfo,
    });
    const jsonResponse = await response.json();
    console.log("jsonresponse", jsonResponse);
    if (jsonResponse) {
      return jsonResponse;
    }
    console.log('ImgObj Sent to API ', spotImg);
    await fetch(`${apiEndPoint}/writeImg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: spotImg,
    });
  }

  
};

export default myAPI;
