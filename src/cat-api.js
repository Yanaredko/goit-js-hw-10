import axios from "axios";

const API_KEY = "live_5UH0dIO3132M3FxIn6BoVgxne3n4bN2Isf388kUYKGYSj1f9qvDfmI3U1f4ahg7J";
axios.defaults.headers.common["x-api-key"] = API_KEY;
const CAT_URL = "https://api.thecatapi.com/v1";

export function fetchBreeds() {
  return axios.get(`${CAT_URL}/breeds`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
export function fetchCatByBreed(breedId) {
  return axios.get(`${CAT_URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data[0])
    .catch(error => {
      throw error;
    });
}