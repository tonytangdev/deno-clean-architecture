import { UserRepository } from "../../domain/repositories/user.repository";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { UserNotFound } from "../errors/user-not-found";

export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.deleteById(userId);
  }
}
