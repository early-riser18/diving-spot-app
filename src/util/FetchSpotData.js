import { json } from "body-parser";

const FetchSpotData = {
  async search(spotID) {
    //The API endpoint has been prepended with CORS to be allowed to access Cross Origin sources
    const response = await fetch(
      `http://localhost:5001/diving-app-eaabe/us-central1/app/spot?spotID=${spotID}`
    );
    console.log('response',response);

    const jsonResponse = await response.json();
    console.log('jsonresponse',jsonResponse);

    if (jsonResponse) {
      return jsonResponse;
    }
  },
};

export default FetchSpotData;
