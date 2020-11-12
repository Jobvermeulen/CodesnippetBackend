import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    imports: [
        UsersModule, 
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { 
                algorithm: 'HS512',
                expiresIn: jwtConstants.expiresIn
            },
        })
    ],
    controllers: [ AuthController ],
    providers: [ AuthService, JwtStrategy ]
})
export class AuthModule {}
