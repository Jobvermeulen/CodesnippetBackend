import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { compareSync } from "bcryptjs";

@Injectable()
export class AuthService 
{
    constructor
    (
        private usersService: UsersService,
        private jwtService: JwtService
    ) 
    {}

    async validateUser(username: string, pass: string): Promise<any> 
    {
        const user = await this.usersService.getByUsernameForLogin(username);

        if (!user)
        {
            throw new UnauthorizedException("Missing username and/or password");
        }

        if (compareSync(pass, user.password) === true) 
        {
            delete(user.password);
            return this.login(user);
        }
        else 
        {
            throw new UnauthorizedException("Incorrect username and/or password");
        }
    }

    async login(user: any) 
    {
        const payload = { user };

        const accessToken = this.jwtService.sign(payload);
        const dateNow     = new Date();

        return {
            accessToken     : accessToken,
            expiresIn       : dateNow.setHours(dateNow.getHours() + jwtConstants.expires)
        }
    }
}
