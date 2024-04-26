import { Task } from "../models/Interfaces";
import { genericAPI } from "./GenericAPI";

class TaskAPI {
  static readonly endpoint = "/tasks";

  async getAllTasks(): Promise<Task[]> {
    const response = await genericAPI.get<Task[]>(`${TaskAPI.endpoint}`);
    return response.data;
  }
}

export const taskAPI = new TaskAPI();
