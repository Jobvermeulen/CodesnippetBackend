import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/users.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller()
export class AuthController 
{
    constructor(private authService: AuthService) 
    {}

    @Post('auth/login')
    async login(@Body() user: Users) 
    {
        return this.authService.validateUser(user.username, user.password);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
    
        return req.user;
    }
    
}