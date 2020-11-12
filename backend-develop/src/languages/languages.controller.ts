import { Controller, Get } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { Languages } from 'src/entities/languages.entity';

@Controller()
export class LanguagesController {
    constructor(private readonly languagesService: LanguagesService) {
    }

    // No need to be logged in to get all languages
    @Get("v1/languages")
    async getAll(): Promise<Languages[]> {
        return await this.languagesService.getAll();
    }

}
