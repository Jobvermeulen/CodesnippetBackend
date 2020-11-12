import {
    EntityRepository,
    Repository,
    IsNull
} from "typeorm";
import { Categories } from "src/entities/categories.entity";

@EntityRepository(Categories)
export class CategoriesRepository extends Repository<Categories>
{
    getAll = async (): Promise<Categories[]> =>
    {
        return await this.find({
            where: {
                deletedAt: IsNull(),
            }
        });
    }
}
