import {
    EntityRepository,
    Repository,
    IsNull
} from "typeorm";
import { Comingsoon } from "src/entities/comingsoon.entity";

@EntityRepository(Comingsoon)
export class ComingsoonRepository extends Repository<Comingsoon>
{
    createRemind = async (comingsoon: Comingsoon): Promise<Comingsoon> =>
    {
        return this.save(comingsoon);
    }
}
