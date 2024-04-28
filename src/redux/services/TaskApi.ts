import { Task } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class TaskAPI {
  static readonly endpoint = "/Task";

  async getAllTasks(): Promise<any[]> {
    const response = await genericAPI.get<Task[]>(`${TaskAPI.endpoint}`);
    // console.log("response.data: ",typeof(response.data[0]));
    return response.data;
  }
}

export const taskAPI = new TaskAPI();
