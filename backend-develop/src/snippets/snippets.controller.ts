import { Controller, Get, Param, Body, Post, Patch, Delete, UseGuards, Request, NotFoundException } from '@nestjs/common';
import { SnippetsService } from './snippets.service';
import { Snippets } from 'src/entities/snippets.entity';
import { UpdateSnippet } from 'src/entities/updateEntities/updateSnippet.entity';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

const jwt = require('jsonwebtoken');

@Controller()
export class SnippetsController {
    constructor(
        private readonly snippetsService: SnippetsService,
    ) {
    }

    @Get("v1/snippets")
    async getAll(): Promise<Snippets[]> {
        return await this.snippetsService.getAll();
    }

    @Get("v1/snippets/explore/:page")
    async getExplore(@Param("page") page: number): Promise<Snippets[]> {
        return await this.snippetsService.getExplore(page);
    }

    @Get("v1/snippets/:id")
    async getById(@Param("id") snippetId: number, @Request() req): Promise<Snippets> {
        const snippet = await this.snippetsService.getById(snippetId);

        return this.checkPrivateStatus(snippet, req);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Post("v1/snippets")
    async create(@Body() snippet: Snippets): Promise<Snippets> {
        return this.snippetsService.create(snippet);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Patch("v1/snippets/:id")
    update(@Param("id") snippetId: number, @Body() snippet: UpdateSnippet) {
        return this.snippetsService.update(snippetId, snippet);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('user', 'admin')
    @Delete("v1/snippets/:id")
    delete(@Param("id") snippetId: number) {
        return this.snippetsService.delete(snippetId);
    }

    /**
     * Check if snippet is private
     * @param snippet 
     * @param req 
     */
    private checkPrivateStatus(snippet, req) {
        if(snippet.private === 1) {
            if(req.headers.authorization == undefined) {
                throw new NotFoundException();
            }
            const token = req.headers.authorization.substr(7);
            const jwtData = jwt.decode(token);

            if (jwtData.user.id !== snippet.user.id) {
                throw new NotFoundException();
            }
        }
        return snippet
    }
}
