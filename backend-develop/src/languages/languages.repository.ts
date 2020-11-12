import {
    EntityRepository,
    Repository,
    IsNull
} from "typeorm";
import { Languages } from "src/entities/languages.entity";

@EntityRepository(Languages)
export class LanguagesRepository extends Repository<Languages>
{
    getAll = async (): Promise<Languages[]> =>
    {
        return await this.find({
            where: {
                deletedAt: IsNull(),
            }
        });
    }
}
