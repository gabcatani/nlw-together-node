import { Request, Response } from "express";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

class ListUserSenderComplimentsController {
  async handle(request: Request, response: Response) {
    const { user_id } = request

    const listUserSendComplimentsService = new ListUserSendComplimentsService();

    const user = await listUserSendComplimentsService.execute(user_id);

    return response.json(user);
  }
}

export { ListUserSenderComplimentsController };