import axios from "axios";
import { SERVER_HOST_ADDRESS } from "../constant";

export const postMove = async (id: number, player: string) => {
  return await axios
    .post(`${SERVER_HOST_ADDRESS}/player/move`, { id, player })
    .then(async (response) => await response.data)
    .catch((err) => console.error(err));
};
