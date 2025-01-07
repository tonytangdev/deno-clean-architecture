import { User } from "../../../domain/entities/user";
import { UserRepository } from "../../../domain/repositories/user.repository";

export class UserRepositoryMock extends UserRepository {
  public create(user: User): Promise<User> {
    return new Promise((resolve) => {
      const id = "id";
      const newUser = new User(
        user.getCreatedAt(),
        user.getUpdatedAt(),
        user.getEmail(),
        user.getUsername(),
        id
      );
      resolve(newUser);
    });
  }

  public deleteById(id: string): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }

  public findByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(new User(new Date(), new Date(), email, "username"));
    });
  }

  public findById(id: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(new User(new Date(), new Date(), "mail@gmail.com", "username"));
    });
  }
}
