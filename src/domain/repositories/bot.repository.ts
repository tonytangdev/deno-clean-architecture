import { Bot } from "../entities/bot";

export abstract class BotRepository {
  public abstract create(bot: Bot): Promise<Bot>;
  public abstract update(bot: Bot): Promise<Bot>;
  public abstract findById(id: Bot["id"]): Promise<Bot | null>;
}
