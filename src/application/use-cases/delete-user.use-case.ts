import { UserRepository } from "../../domain/repositories/user.repository";
import { UserAlreadyExists } from "../errors/user-already-exists";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = this.userRepository.findById(userId);
    if (!!user) {
      throw new UserAlreadyExists();
    }

    throw new Error("Not implemented");
  }
}
