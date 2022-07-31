import axios from "axios";

const journalApi = axios.create({
  baseURL: "https://sample-apps-43c93-default-rtdb.firebaseio.com",
});

export default journalApi;
