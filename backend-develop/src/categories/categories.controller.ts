import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Categories } from 'src/entities/categories.entity';

@Controller()
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {
    }

    // No need to be logged in to get all categories
    @Get("v1/categories")
    async getAll(): Promise<Categories[]> {
        return await this.categoriesService.getAll();
    }

}
