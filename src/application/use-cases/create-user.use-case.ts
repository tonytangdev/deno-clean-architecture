import { validateOrReject } from "class-validator";
import { User } from "../../domain/entities/user";
import { CreateUserDTO } from "../dto/create-user.dto";
import { CreateUserInvalid } from "../errors/create-user-invalid";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserMapper } from "../mappers/user.mapper";

export class CreateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(userDTO: CreateUserDTO): Promise<User> {
    try {
      await validateOrReject(userDTO);
    } catch (error) {
      throw new CreateUserInvalid();
    }

    const userExists = await this.userRepository.findByEmail(userDTO.email);
    if (userExists) throw new UserAlreadyExists();

    throw new Error("Method not implemented.");
  }
}
