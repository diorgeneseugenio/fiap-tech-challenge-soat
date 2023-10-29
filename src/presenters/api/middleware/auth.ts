import { NextFunction, Request, Response } from "express";

import Authenticatior from "~datasources/authentication/authentication";
import { UserType } from "~domain/repositories/authenticationRepository";


export default function authenticate(type: UserType) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req?.headers?.authorization?.split(' ')[1] as string;
            const authenticatior = new Authenticatior();
            console.log(type)
            await authenticatior.authUser(token, type);

            return next();
        } catch (error: any) {
            res.status(401).json({
                error: error.message,
            });
        }
    };
}
