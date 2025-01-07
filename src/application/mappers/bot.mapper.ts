import { Bot } from "../../domain/entities/bot";
import { User } from "../../domain/entities/user";
import { CreateBotDTO } from "../dto/create-bot.dto";

export class BotMapper {
  public static toEntity(
    botDTO: CreateBotDTO,
    user: User,
    createdAt?: Date
  ): Bot {
    return new Bot(user, createdAt, createdAt, botDTO.prompt);
  }
}
