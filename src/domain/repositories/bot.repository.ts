import { Bot } from "../entities/bot";

export abstract class BotRepository {
  public abstract create(bot: Bot): Promise<Bot>;
}
