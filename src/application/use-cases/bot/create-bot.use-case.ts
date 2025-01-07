import { Bot } from "../../../domain/entities/bot";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { CreateBotDTO } from "../../dto/create-bot.dto";
import { UserNotFound } from "../../errors/user-not-found";
import { BotMapper } from "../../mappers/bot.mapper";

export class CreateBotUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly botRepository: BotRepository
  ) {}

  public async execute(botDTO: CreateBotDTO): Promise<Bot> {
    const user = await this.userRepository.findById(botDTO.userId);
    if (!user) {
      throw new UserNotFound();
    }

    const bot = BotMapper.toEntity(botDTO, user, new Date());
    return await this.botRepository.create(bot);
  }
}
