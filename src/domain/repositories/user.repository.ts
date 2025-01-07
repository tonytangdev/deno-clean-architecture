import { User } from "../entities/user";

export abstract class UserRepository {
  public abstract findById(id: string): Promise<User | undefined>;
  public abstract findByEmail(email: string): Promise<User | undefined>;
  public abstract create(user: User): Promise<User>;
  public abstract deleteById(id: string): Promise<void>;
}
