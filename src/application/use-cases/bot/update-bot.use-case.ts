import { Bot } from "../../../domain/entities/bot";
import { User } from "../../../domain/entities/user";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UpdateBotDTO } from "../../dto/bots/update-bot.dto";
import { BotNotFound } from "../../errors/bots/bot-not-found";
import { UserNotFound } from "../../errors/users/user-not-found";
import { BotMapper } from "../../mappers/bot.mapper";

export class UpdateBotUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly botRepository: BotRepository
  ) {}

  public async execute(userId: User["id"], botDTO: UpdateBotDTO): Promise<Bot> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFound();
    }

    const existingBot = await this.botRepository.findById(botDTO.id);
    if (!existingBot) {
      throw new BotNotFound();
    }

    const bot = BotMapper.toEntity(botDTO, user);

    return await this.botRepository.update(bot);
  }
}
