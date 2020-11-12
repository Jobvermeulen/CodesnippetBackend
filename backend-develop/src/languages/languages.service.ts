import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LanguagesRepository } from './languages.repository';
import { Languages } from 'src/entities/languages.entity';

@Injectable()
export class LanguagesService {
    constructor(
        @InjectRepository(LanguagesRepository)
        private readonly languagesRepository: LanguagesRepository,
    ) {
    }

    async getAll(): Promise<Languages[]> {
        return await this.languagesRepository.getAll();
    }



}
