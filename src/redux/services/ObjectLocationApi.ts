import { ObjectLocation } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class ObjectLocationAPI{
    static readonly endpoint = "/locationobject";

    async getAllObjetsOfLocation(locationId: number): Promise<any[]>{
        console.log("in location object " + locationId);
        const response = await genericAPI.get<ObjectLocation[]>(`${ObjectLocationAPI.endpoint}/getAll/${locationId}`);
        console.log("object data ", response.data);
        return response.data;
    }

}

export const objectAPI = new ObjectLocationAPI();
