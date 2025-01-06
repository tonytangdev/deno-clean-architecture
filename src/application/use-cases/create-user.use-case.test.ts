import assert from "assert/strict";
import { describe, it, beforeEach } from "node:test";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserInvalid } from "../errors/create-user-invalid";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";

class UserRepositoryTest implements UserRepository {
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
  public findByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(new User(new Date(), new Date(), email, "username"));
    });
  }
}

describe("Create User Use Case", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryTest();
  });

  it("should throw an error when the user is invalid", async () => {
    const user = new CreateUserDTO();
    user.email = "invalid-email";
    user.username = "";
    const createUserUseCase = new CreateUserUseCase(userRepository);
    try {
      await createUserUseCase.execute(user);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof CreateUserInvalid);
      assert.deepStrictEqual(error, new CreateUserInvalid());
    }
  });
  it("should throw an error when the user already exists", async () => {
    const user = new CreateUserDTO();
    user.email = "test@gmail.com";
    user.username = "test";
    const createUserUseCase = new CreateUserUseCase(userRepository);
    try {
      await createUserUseCase.execute(user);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserAlreadyExists);
      assert.deepStrictEqual(error, new UserAlreadyExists());
    }
  });
  it.todo("should create a new user");
});
