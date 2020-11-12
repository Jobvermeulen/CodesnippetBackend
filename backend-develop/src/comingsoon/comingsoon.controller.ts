import { Controller, Post, Body } from '@nestjs/common';
import { ComingsoonService } from './comingsoon.service';
import { Comingsoon } from 'src/entities/comingsoon.entity';
import { MailingService } from 'src/mailing/mailing.service';

@Controller()
export class ComingsoonController {
    constructor(private readonly comingsoonService: ComingsoonService,
        private readonly mailingService: MailingService) {
    }

    // No need to be logged in to add to remind me list
    @Post("v1/remindme")
    async getAll(@Body() comingsoon: Comingsoon): Promise<Comingsoon> {
        const mail = await this.comingsoonService.createRemind(comingsoon);

        this.mailingService.remindmeMail(mail.emailaddress);
        return mail;
    }

}
