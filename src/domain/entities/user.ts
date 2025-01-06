export class User {
  constructor(
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly email: string,
    private readonly username: string,
    private readonly id?: string,
    private readonly deletedAt?: Date
  ) {}

  public getId(): string | undefined {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getEmail(): string {
    return this.email;
  }

  public getUsername(): string {
    return this.username;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}
