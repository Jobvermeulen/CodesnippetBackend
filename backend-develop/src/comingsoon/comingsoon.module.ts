import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComingsoonRepository } from './comingsoon.repository';
import { ComingsoonService } from './comingsoon.service';
import { ComingsoonController } from './comingsoon.controller';
import { MailingService } from 'src/mailing/mailing.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ComingsoonRepository])
    ],
    providers: [ComingsoonService, MailingService],
    controllers: [ComingsoonController],
    exports: [ComingsoonService],
})
export class ComingsoonModule {}
