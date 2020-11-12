import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from './categories.repository';
import { Categories } from 'src/entities/categories.entity';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(CategoriesRepository)
        private readonly categoriesRepository: CategoriesRepository,
    ) {
    }

    async getAll(): Promise<Categories[]> {
        return await this.categoriesRepository.getAll();
    }

}
