import { genericAPI } from "./GenericAPI";

class LoginAPI {
  async login(username: string, password: string): Promise<void> {
    await genericAPI.login(username, password);
  }
}

export const loginAPI = new LoginAPI();
