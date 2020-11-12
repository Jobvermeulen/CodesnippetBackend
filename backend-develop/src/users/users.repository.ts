import { Users } from "../entities/users.entity";
import {
    EntityRepository,
    Repository,
    IsNull,
    UpdateResult
} from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { UpdateUser } from "src/entities/updateEntities/updateUser.entity";
import { hashSync } from "bcryptjs";

@EntityRepository(Users)
export class UsersRepository extends Repository<Users>
{
    getAll = async (): Promise<Users[]> =>
    {
        return await this.find({
            where: {
                deletedAt: IsNull(),
            },
            relations: ['role']
        });
    }

    getById = async (userId: number): Promise<Users> =>
    {
        const user = await this.findOne({
            where: {
                id: userId,
                deletedAt: IsNull(),
            },
            relations: ['role']
        });

        if (!user)
        {
            throw new NotFoundException();
        }

        return user;
    }

    getByUsername = async (username: string): Promise<Users> =>
    {
        const user = await this.findOne({
            where: {
                username: username,
                deletedAt: IsNull(),
            },
            relations: ['role']
        });

        if (!user)
        {
            return null;
        }

        return user;
    }

    getByUsernameForLogin = async (username: string): Promise<Users> =>
    {
        const user = await this.findOne({
            select: [
                "id", "fullName", "username", "password", "email"
            ],
            where: {
                username: username,
                deletedAt: IsNull(),
            },
            relations: ['role']
        });

        if (!user)
        {
            return null;
        }

        return user;
    }

    getByEmail = async (email: string): Promise<Users> =>
    {
        const user = await this.findOne({
            where: {
                email: email,
                deletedAt: IsNull(),
            }
        });

        if (!user)
        {
            return null;
        }

        return user;
    }

    createUser = async (user: Users): Promise<Users> =>
    {
        user.roleId = 1;
        user.password = hashSync(user.password, 10);
        return this.save(user);
    }

    updateUser = async (userId: number, user: UpdateUser): Promise<UpdateResult> =>
    {
        return this.update({ id: userId }, user);
    }

    deleteUser = async (userId: number): Promise<object> =>
    {
        const newUserData: UpdateUser = {
            deletedAt: new Date(),
        };

        return this.updateUser(userId, newUserData);
    }
}
