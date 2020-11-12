import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {UsersRepository} from './users.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {UpdateUser} from 'src/entities/updateEntities/updateUser.entity';
import {Users} from "../entities/users.entity";
import { UserResetPasswordRepository } from './userResetPassword.repository';
import { UserResetPassword } from 'src/entities/userResetPassword.entity';
import { hashSync } from "bcryptjs";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private readonly usersRepository: UsersRepository,

        @InjectRepository(UserResetPasswordRepository)
        private readonly usersResetPasswordRepository: UserResetPasswordRepository,
    ) {
    }

    async getAll(): Promise<Users[]> {
        return await this.usersRepository.getAll();
    }

    async getById(userId: number): Promise<Users> {
        return await this.usersRepository.getById(userId);
    }

    async checkUserExistenceByValue(value: string): Promise<boolean>
    {
        const getByUsername = await this.usersRepository.getByUsername(value);
        const getByEmail = await this.usersRepository.getByEmail(value);

        return getByUsername instanceof Users || getByEmail instanceof Users;
    }

    async getByUsername(username: string): Promise<Users | undefined> {
        return await this.usersRepository.getByUsername(username);
    }

    async getByUsernameForLogin(username: string): Promise<Users | undefined> {
        return await this.usersRepository.getByUsernameForLogin(username);
    }

    async getByEmail(email: string): Promise<Users | undefined> {
        return await this.usersRepository.getByEmail(email);
    }

    async create(user: Users): Promise<Users> {
        return await this.usersRepository.createUser(user);
    }

    async update(userId: number, user: UpdateUser): Promise<object> {
        return await this.usersRepository.updateUser(userId, user);
    }

    async delete(userId: number): Promise<object> {
        return await this.usersRepository.deleteUser(userId);
    }

    async resetPassword(email: string) {
        const user = await this.usersRepository.getByEmail(email);
        return this.usersResetPasswordRepository.insertResetPasswordToken(user.id);
    }

    async checkToken(token: string): Promise<UserResetPassword> {
        return await this.usersResetPasswordRepository.checkToken(token);
    }

    async updateToken(token: string, userResetPassword: UserResetPassword): Promise<object> {
        return await this.usersResetPasswordRepository.updateToken(token);
    }

    async updatePassword(password: string, userResetPassword: UserResetPassword) {
        const updateUser: UpdateUser = {
            password: hashSync(password, 10)
        }
        this.usersRepository.update(userResetPassword.userId, updateUser)
        .then(async () => {
            return await this.usersResetPasswordRepository.updateToken(userResetPassword.token); 
        })
        .catch((e) => {
            throw InternalServerErrorException;
        })
    }

}
