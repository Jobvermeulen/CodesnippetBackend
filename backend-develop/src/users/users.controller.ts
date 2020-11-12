import {Controller, Get, Param, Body, Post, Patch, Delete, UseGuards, HttpException, HttpStatus} from '@nestjs/common';
import {UsersService} from './users.service';
import {Users} from '../entities/users.entity';
import {UpdateUser} from 'src/entities/updateEntities/updateUser.entity';
import {JwtAuthGuard} from 'src/auth/guards/jwt-auth.guard';
import {RolesGuard} from 'src/auth/guards/roles.guard';
import {Roles} from 'src/auth/decorators/roles.decorator';
import { UserResetPassword } from 'src/entities/userResetPassword.entity';

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    // Check, Create User
    // No need to be logged in
    @Get("v1/users/check/:value")
    async checkUser(@Param("value") value: string): Promise<boolean> {
        return await this.userService.checkUserExistenceByValue(value);
    }

    @Post("v1/users")
    async create(@Body() user: Users): Promise<Users> {
        const existUser = await this.checkUser(user.username);
        const existEmail = await this.checkUser(user.email);

        if (!existUser && !existEmail) {
            return this.userService.create(user);
        }
    }

    @Post("v1/users/reset-password")
    async resetPassword(@Body("email") email: string) {
        return await this.userService.resetPassword(email);
    }

    @Get("v1/users/reset-password/:token")
    async checkToken(@Param("token") token: string): Promise<UserResetPassword> {
        return await this.userService.checkToken(token);
    }

    @Patch("v1/users/reset-password")
    async updatePassword(@Body("password") password: string, @Body("UserResetPassword") userResetPassword: UserResetPassword) {
        return await this.userService.updatePassword(password, userResetPassword)
    }

    // Get, Post, Patch, Delete User
    // Need to be logged in
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Get("v1/users/")
    getAll(): Promise<Users[]> {
        return this.userService.getAll();
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Get("v1/users/:id")
    getById(@Param("id") userId: number): Promise<Users> {
        return this.userService.getById(userId);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Patch("v1/users/:id")
    update(@Param("id") userId: number, @Body() user: UpdateUser) {
        return this.userService.update(userId, user);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Delete("v1/users/:id")
    delete(@Param("id") userId: number) {
        return this.userService.delete(userId);
    }

}
