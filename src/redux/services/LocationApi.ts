import { Location } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class LocationAPI {
  static readonly endpoint = "/location";

  async getAllLocations(): Promise<any[]> {
    const response = await genericAPI.get<Location[]>(`${LocationAPI.endpoint}`);
    console.log("curr locations ",response.data);
    return response.data;
  }
}

export const locationAPI = new LocationAPI();