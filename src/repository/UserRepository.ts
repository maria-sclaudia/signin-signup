import { EntityRepository, Repository } from "typeorm";
import { UserModel } from "../model/UserModel";

@EntityRepository(UserModel)
class UserRepository extends Repository<UserModel> {

}

export { UserRepository }