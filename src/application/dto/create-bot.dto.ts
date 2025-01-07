import { User } from "../../domain/entities/user";

export class CreateBotDTO {
  userId: User["id"];
  prompt: string;
}
