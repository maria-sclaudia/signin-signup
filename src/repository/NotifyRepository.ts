import { EntityRepository, Repository } from "typeorm";
import { NotifyModel } from "../model/NotifyModel";

@EntityRepository(NotifyModel)
class NotifyRepository extends Repository<NotifyModel> {

}

export { NotifyRepository }