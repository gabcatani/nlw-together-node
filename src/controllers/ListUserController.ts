import { Request, Response } from "express";
import listUserService from "../services/ListUserService";
import { classToPlain } from "class-transformer";

class ListUserController {
    async handle(request: Request, response: Response) {
        const users = await listUserService.execute();
        return classToPlain(users);
    }
}

export default new ListUserController();