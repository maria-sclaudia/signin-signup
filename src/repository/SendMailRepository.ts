import { EntityRepository, Repository } from "typeorm";
import { SendMailModel } from "../model/SendMailModel";

@EntityRepository(SendMailModel)
class SendMailRepository extends Repository<SendMailModel> {

}

export { SendMailRepository }