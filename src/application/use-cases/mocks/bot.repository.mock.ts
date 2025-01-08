import { Bot } from "../../../domain/entities/bot";
import { User } from "../../../domain/entities/user";
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
  public update(bot: Bot): Promise<Bot> {
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
  public findById(id: Bot["id"]): Promise<Bot | null> {
    return new Promise((resolve) => {
      const user = new User(
        new Date(),
        new Date(),
        "email@test.com",
        "username",
        "123"
      );
      resolve(new Bot(user, new Date(), new Date(), "prompt", id));
    });
  }

  public findBotsByUserId(userId: User["id"]): Promise<Bot[]> {
    const bots = [];
    const user = new User(
      new Date(),
      new Date(),
      "email@test.com",
      "username",
      userId
    );

    const bot1 = new Bot(user, new Date(), new Date(), "prompt", "1");
    const bot2 = new Bot(user, new Date(), new Date(), "prompt", "2");

    bots.push(bot1);
    bots.push(bot2);

    return new Promise((resolve) => resolve(bots));
  }
}
