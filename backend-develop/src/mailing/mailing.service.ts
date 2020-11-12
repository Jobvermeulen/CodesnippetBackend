import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

var ejs = require('ejs');

@Injectable()
export class MailingService {
    constructor(private readonly mailerService: MailerService) {}
    
    public example(email: string): void {
        this
            .mailerService
            .sendMail({
                to: email, // list of receivers
                from: '"Thomas - CodeSnippet" <thomas@codesnippet.tech>', // sender address
                subject: 'Testing Nest MailerModule ✔', // Subject line
                text: 'welcome', // plaintext body
                html: '<b>welcome</b>', // HTML body content
            })
            .catch((err) => {
                console.log(err)
            });
    }
    
    public remindmeMail(email: string): void {
        this
            .mailerService
            .sendMail({
                to: [email],
                subject: 'CodeSnippet mailing',
                from: '"Thomas - CodeSnippet" <thomas@codesnippet.tech>',
                template: 'index', // The `.pug` or `.hbs` extension is appended automatically.
                context: {    // Data to be sent to template engine.
                    code: 'Code',
                    username: 'Username',
                }
            })
            .catch((err) => {
                console.log(err)
            });
    }
}