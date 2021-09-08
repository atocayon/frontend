import axios from "axios";
import { SERVER_HOST_ADDRESS } from "../constant";

export const getInitialData = async () => {
  return await axios
    .get(SERVER_HOST_ADDRESS)
    .then(async (response) => await response.data)
    .catch((err) => {
      console.error(err);
      return [];
    });
};
