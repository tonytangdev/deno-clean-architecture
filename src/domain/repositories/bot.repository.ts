import { Bot } from "../entities/bot";
import { User } from "../entities/user";

export abstract class BotRepository {
  public abstract create(bot: Bot): Promise<Bot>;
  public abstract update(bot: Bot): Promise<Bot>;
  public abstract findById(id: Bot["id"]): Promise<Bot | null>;
  public abstract findBotsByUserId(userId: User["id"]): Promise<Bot[]>;
}
