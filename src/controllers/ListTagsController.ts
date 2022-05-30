import { Request, Response } from "express";
import { ListTagsService } from "../services/ListTagsService";
import { classToPlain } from "class-transformer";


class ListTagsController {
    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagsService();
        const tags = await listTagsService.execute();
        return classToPlain(tags);
    }
}

export default new ListTagsController()