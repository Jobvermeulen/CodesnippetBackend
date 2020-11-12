import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesRepository } from './languages.repository';
import { LanguagesService } from './languages.service';
import { LanguagesController } from './languages.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([LanguagesRepository])
    ],
    providers: [LanguagesService],
    controllers: [LanguagesController],
    exports: [LanguagesService],
})
export class LanguagesModule {}
