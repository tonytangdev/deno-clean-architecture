import { User } from "../../../domain/entities/user";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UserNotFound } from "../../errors/users/user-not-found";

export class ListUserBotsUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly botRepository: BotRepository
  ) {}

  async execute(userId: User["id"]) {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFound();
    }

    return this.botRepository.findBotsByUserId(userId);
  }
}
