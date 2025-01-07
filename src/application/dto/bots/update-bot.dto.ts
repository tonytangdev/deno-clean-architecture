import { Bot } from "../../../domain/entities/bot";
import { CreateBotDTO } from "./create-bot.dto";

export class UpdateBotDTO extends CreateBotDTO {
  id: Bot["id"];
  userId: undefined;
}
