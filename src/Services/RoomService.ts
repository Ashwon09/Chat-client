import { generalAPI } from "./ApiService";

export function getRoomNumber() {
  return generalAPI.get(`room/get`);
}
