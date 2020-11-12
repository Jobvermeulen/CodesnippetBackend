import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { LanguagesModule } from './languages/languages.module';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import * as dotenv from 'dotenv';
import { SnippetsModule } from './snippets/snippets.module';
import { ComingsoonModule } from './comingsoon/comingsoon.module';
dotenv.config();

@Module({
    imports: [
        AuthModule, 
        CategoriesModule,
        ComingsoonModule,
        LanguagesModule,
        UsersModule,
        SnippetsModule,
        TypeOrmModule.forRoot({
            type       : 'mysql',
            host       : process.env.DB_HOST,
            port       : Number(process.env.DB_PORT),
            username   : process.env.DB_USERNAME,
            password   : process.env.DB_PASSWORD,
            database   : process.env.DB_DATABASE,
            entities   : [__dirname + '/entities/*.entity{.ts,.js}'],
            synchronize: false,
        }),
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false, // upgrade later with STARTTLS
                auth: {
                    user: process.env.EMAIL_ID, 
                    pass: process.env.EMAIL_PASS
                },
                tls: {
                    // do not fail on invalid certs
                    rejectUnauthorized: false
                },
                // debug: true, // show debug output
                // logger: true // log information in console
            },
            defaults: {
                from:'"Thomas - CodeSnippet" <thomas@codesnippet.tech>',
            },
            template: {
                dir: process.cwd() + '/templates/',
                adapter: new HandlebarsAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
})
export class AppModule {}