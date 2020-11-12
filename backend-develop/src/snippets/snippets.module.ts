import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnippetsRepository } from './snippets.repository';
import { SnippetsService } from './snippets.service';
import { SnippetsController } from './snippets.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([SnippetsRepository])
    ],
    providers: [SnippetsService],
    controllers: [SnippetsController],
    exports: [SnippetsService],
})
export class SnippetsModule {}
