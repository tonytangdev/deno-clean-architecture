import { SupportedMessagingPlatforms } from "../../shared/enums/supported-messaging-platforms";

export class MessagingPlatform {
  constructor(
    private readonly id: string,
    private readonly createdAt: Date,
    private readonly updatedAt: Date,
    private readonly messagingPlatformName: SupportedMessagingPlatforms,
    private readonly deletedAt?: Date
  ) {}

  public getId(): string {
    return this.id;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getMessagingPlatformName(): SupportedMessagingPlatforms {
    return this.messagingPlatformName;
  }

  public getDeletedAt(): Date | undefined {
    return this.deletedAt;
  }
}
