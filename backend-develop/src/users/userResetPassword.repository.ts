import { Users } from "../entities/users.entity";
import {
    EntityRepository,
    Repository,
    IsNull,
    MoreThan,
    UpdateResult,
} from "typeorm";
import { UserResetPassword } from "src/entities/userResetPassword.entity";
import { randomBytes } from "crypto";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(UserResetPassword)
export class UserResetPasswordRepository extends Repository<UserResetPassword> {

    insertResetPasswordToken = async (userId: number) => {
        const token  = randomBytes(32).toString("hex").substr(0, 32);
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 1);

        const userResetPassword: UserResetPassword = {
            userId   : userId,
            expiresAt: expiry,
            token    : token
        };

        return this.save(userResetPassword);
    } 

    checkToken = async (token: string): Promise<UserResetPassword> => {
        const userResetPassword = this.findOne({
            where: {
                token    : token,
                expiresAt: MoreThan(Date.now),
                usedAt   : IsNull()
            }
        })

        if (!userResetPassword) {
            throw NotFoundException;
        }

        return userResetPassword;
    }

    updateToken = async (token: string): Promise<UpdateResult> => {
        const userResetPassword: UserResetPassword = {
            usedAt: new Date(),
        }
        
        return this
            .update(
                { token: token },
                userResetPassword,
            );
    }
}
