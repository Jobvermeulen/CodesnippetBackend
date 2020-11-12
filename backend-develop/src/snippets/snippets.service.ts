import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SnippetsRepository } from './snippets.repository';
import { Snippets } from 'src/entities/snippets.entity';
import { UpdateSnippet } from 'src/entities/updateEntities/updateSnippet.entity';

@Injectable()
export class SnippetsService {
    constructor(
        @InjectRepository(SnippetsRepository)
        private readonly snippetsRepository: SnippetsRepository,
    ) {
    }

    async getAll(): Promise<Snippets[]> {
        return await this.snippetsRepository.getAll();
    }

    async getExplore(page: number): Promise<Snippets[]> {
        return await this.snippetsRepository.getExplore(page);
    }

    async getById(snippetId: number): Promise<Snippets> {
        return await this.snippetsRepository.getById(snippetId);
    }

    async create(snippet: Snippets): Promise<Snippets> {
        return await this.snippetsRepository.createSnippet(snippet);
    }

    async update(snippetId: number, snippet: UpdateSnippet): Promise<object> {
        return await this.snippetsRepository.updateSnippet(snippetId, snippet);
    }

    async delete(snippetId: number): Promise<object> {
        return await this.snippetsRepository.deleteSnippet(snippetId);
    }
}
