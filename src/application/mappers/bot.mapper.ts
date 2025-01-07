import { Bot } from "../../domain/entities/bot";
import { User } from "../../domain/entities/user";
import { CreateBotDTO } from "../dto/bots/create-bot.dto";
import { UpdateBotDTO } from "../dto/bots/update-bot.dto";

export class BotMapper {
  public static toEntity(
    botDTO: CreateBotDTO | UpdateBotDTO,
    user: User,
    createdAt?: Date
  ): Bot {
    if (botDTO instanceof UpdateBotDTO) {
      return new Bot(user, createdAt, new Date(), botDTO.prompt, botDTO.id);
    }
    return new Bot(user, createdAt, createdAt, botDTO.prompt);
  }
}
