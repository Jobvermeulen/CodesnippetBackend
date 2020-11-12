import {
    EntityRepository,
    Repository,
    IsNull,
    UpdateResult
} from "typeorm";
import { Snippets } from "src/entities/snippets.entity";
import { UpdateSnippet } from "src/entities/updateEntities/updateSnippet.entity";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Snippets)
export class SnippetsRepository extends Repository<Snippets>
{
    getAll = async (): Promise<Snippets[]> =>
    {
        return await this.find({
            where: {
                private: 0,
                deletedAt: IsNull(),
            },
            relations: ['user', 'category', 'language']
        });
    }

    getExplore = async (page: number): Promise<Snippets[]> =>
    {
        const pageLength   = 25
        const skipSnippets = page * pageLength;

        return await this.find({
            select: [ "id", "name", "createdAt", "user", "language", "category" ],
            where: {
                private: 0,
                deletedAt: IsNull(),
            },
            skip: skipSnippets,
            take: pageLength,
            relations: ['user', 'category', 'language']
        })
    }

    getById = async (snippetId: number): Promise<Snippets> =>
    {
        const snippet = await this.findOne({
            where: {
                id: snippetId,
                deletedAt: IsNull(),
            },
            relations: ['user', 'category', 'language']
        })

        if (!snippet)
        {
            throw new NotFoundException();
        }

        return snippet;
    }

    createSnippet = async (snippet: Snippets): Promise<Snippets> =>
    {
        return this.save(snippet);
    }

    updateSnippet = async (snippetId: number, snippet: UpdateSnippet): Promise<UpdateResult> =>
    {
        snippet.changedAt = new Date();

        return this.update({ id: snippetId }, snippet);
    }

    updateDeletedSnippet = async (snippetId: number, snippet: UpdateSnippet): Promise<UpdateResult> =>
    {   
        return this.update({ id: snippetId }, snippet);
    }

    deleteSnippet = async (snippetId: number): Promise<object> =>
    {
        const newSnippetData: UpdateSnippet = {
            deletedAt: new Date(),
        };

        return this.updateDeletedSnippet(snippetId, newSnippetData);
    }
}
