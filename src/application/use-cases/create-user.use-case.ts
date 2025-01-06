import { validateOrReject } from "class-validator";
import { User } from "../../domain/entities/user";
import { CreateUserDTO } from "../dto/create-user.dto";
import { CreateUserInvalid } from "../errors/create-user-invalid";
import { UserAlreadyExists } from "../errors/user-already-exists";

export class CreateUserUseCase {
  constructor() {}

  public async execute(user: CreateUserDTO): Promise<User> {
    try {
      await validateOrReject(user);
    } catch (error) {
      throw new CreateUserInvalid();
    }
    throw new UserAlreadyExists();

    throw new Error("Method not implemented.");
  }
}
