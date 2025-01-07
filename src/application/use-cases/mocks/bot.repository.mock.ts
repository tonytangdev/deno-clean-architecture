import { Bot } from "../../../domain/entities/bot";
import { BotRepository } from "../../../domain/repositories/bot.repository";

export class BotRepositoryMock extends BotRepository {
  public create(bot: Bot): Promise<void> {
    throw new Error("Not implemented");
  }
}
