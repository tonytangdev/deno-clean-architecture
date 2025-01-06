import { User } from "./user";

export class Bot {
  constructor(
    private readonly user: User,
    private readonly id: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly prompt: string,
    private readonly deletedAt?: Date
  ) {}

  public getUser(): User {
    return this.user;
  }

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getPrompt(): string {
    return this.prompt;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}
