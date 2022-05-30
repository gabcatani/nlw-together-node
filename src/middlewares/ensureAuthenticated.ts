import { Request, Response, NextFunction } from "express"
import { verify } from "jsonwebtoken"
import { promisify } from "util"


interface IPayload {
    sub: string
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization

    if(!authToken) {
        return response.status(401).json({
            error: 'Token not provided'
        })
    }

    const [, token] = authToken.split(" ")

    try {

        // const decoded = await promisify(verify)(token, authConfig.secret)
        // e5176b450ef2fc8c611b5f9924de65ce

        // request.user_id = decoded.id

        return next()

    } catch (err) {
        return response.status(401).json({
            error: 'Token invalid'
        })
    }
}