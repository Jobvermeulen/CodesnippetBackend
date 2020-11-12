import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ComingsoonRepository } from './comingsoon.repository';
import { Comingsoon } from 'src/entities/comingsoon.entity';

@Injectable()
export class ComingsoonService {
    constructor(
        @InjectRepository(ComingsoonRepository)
        private readonly comingsoonRepository: ComingsoonRepository,
    ) {
    }

    async createRemind(comingsoon: Comingsoon): Promise<Comingsoon> {
        return await this.comingsoonRepository.createRemind(comingsoon);
    }

}
