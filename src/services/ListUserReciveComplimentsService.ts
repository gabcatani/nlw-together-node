import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"


class ListUserReciveComplimentsService {
    async execute(user_id: string){
        const usersRepositories = getCustomRepository(ComplimentsRepositories)

        const compliments = await usersRepositories.find({
            where: { 
                user_reciver: user_id 
            }
        })

        return compliments
    }
}

export { ListUserReciveComplimentsService }