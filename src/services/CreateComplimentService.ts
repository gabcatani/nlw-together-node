import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";
interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {

    async execute({ tag_id, user_sender, user_receiver, message }: IComplimentRequest) {

        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);
    
        if(user_sender === user_receiver) {
            throw new Error("You can't send a compliment to yourself");
        }

        const userReciverExist = await usersRepositories.findOne({ 
            where: { id: user_receiver } 
        });

        if(!userReciverExist) {
            throw new Error('User receiver not found');
        }
        
        const compliment = complimentsRepositories.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        })

        await complimentsRepositories.save(compliment);

        return compliment
        
    }
}

export { CreateComplimentService }