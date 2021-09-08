import axios from "axios";
import { SERVER_HOST_ADDRESS } from "../constant";

export const newGame = async () => {
  return await axios
    .post(`${SERVER_HOST_ADDRESS}/new_game`)
    .then(async (response) => await response.data)
    .catch((err) => {
      console.error(err);
      return [];
    });
};
