import { Bot } from "../../../domain/entities/bot";
import { BotRepository } from "../../../domain/repositories/bot.repository";

export class BotRepositoryMock extends BotRepository {
  public create(bot: Bot): Promise<Bot> {
    return new Promise((resolve) =>
      resolve(
        new Bot(
          bot.getUser(),
          bot.getCreatedAt(),
          bot.getUpdatedAt(),
          bot.getPrompt(),
          "1"
        )
      )
    );
  }
}
