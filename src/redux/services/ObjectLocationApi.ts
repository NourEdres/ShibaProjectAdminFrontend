import { AxiosResponse } from "axios";
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

    async createObject(locationId: number, formData: FormData): Promise<any> {
        console.log("in create location object " + locationId);
        try {
            const response = await genericAPI.postFormData<any>(`${ObjectLocationAPI.endpoint}/create/${locationId}`, formData);
            return response.data;
        } catch (error: any) {
            console.error('Error creating object:', error);
            if (error.response && error.response.data) {
                throw error.response.data;
            }
            throw error;
        }
    }

    async deleteObject(objectID: number): Promise<AxiosResponse> {
        try {
          const response = await genericAPI.delete<void>(`${ObjectLocationAPI.endpoint}/delete/${objectID}`);
          console.log("delete response ", response.data);
          return response;
        } catch (error: any) {
          console.error('Error deleting location (in api):'+ error);
          if (error.response && error.response.data) {
            console.error('Error deleting location (in api in if): '+ error.response.data);
            throw error.response.data;
          }
          throw error;
        }
      }

      async updateObject(objectId: number, formData: FormData): Promise<any> {
        console.log("in update location object " + objectId);
        try {
            const response = await genericAPI.putFormData<ObjectLocation>(`${ObjectLocationAPI.endpoint}/update/${objectId}`, formData);
            return response.data;
        } catch (error: any) {
            console.error('Error updating object:', error);
            if (error.response && error.response.data) {
                throw error.response.data;
            }
            throw error;
        }
    }

}

export const objectAPI = new ObjectLocationAPI();
