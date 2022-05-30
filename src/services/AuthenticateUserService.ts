import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'

interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
   
    async execute({email, password}: IAuthenticateRequest) {
        
        const userRepository = getCustomRepository(UsersRepositories);
        
        const user = await userRepository.findOne({
            email
        })

        if (!user) {
            throw new Error('Email/Password incorrect')
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new Error('Email/Password incorrect')
        }

        const token = sign({
            email: user.email,
        }, 'e5176b450ef2fc8c611b5f9924de65ce', {
            subject: 'user.id',
            expiresIn: '1d',
        })

        return token
    }
}

export { AuthenticateUserService }