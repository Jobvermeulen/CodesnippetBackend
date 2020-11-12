import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UserResetPasswordRepository } from './userResetPassword.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UsersRepository, UserResetPasswordRepository])
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {}
