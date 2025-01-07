export class BotNotFound extends Error {
  constructor() {
    super("Bot not found");
    this.name = "BotNotFound";
  }
}
