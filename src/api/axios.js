import axios from "axios";

const axiosInstance = axios.create({
  //local instance of firebase functions
  // baseURL: "http://127.0.0.1:5001/clone-mesgana/us-central1/api",

  //Deploy version of amazon server on render.com
  baseURL: "https://amazon-api-deploy-hy1p.onrender.com/",
});

export { axiosInstance };
