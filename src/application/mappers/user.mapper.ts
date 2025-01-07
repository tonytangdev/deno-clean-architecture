import { CreateUserDTO } from "../dto/users/create-user.dto";
import { User } from "../../domain/entities/user";

export class UserMapper {
  public static toEntity(userDTO: CreateUserDTO, createdAt?: Date): User {
    return new User(createdAt, createdAt, userDTO.email, userDTO.username);
  }
}
