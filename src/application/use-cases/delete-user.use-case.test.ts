import { beforeEach, describe, it, mock } from "node:test";
import { UserRepository } from "../../domain/repositories/user.repository";
import { User } from "../../domain/entities/user";
import { DeleteUserUseCase } from "./delete-user.use-case";
import assert from "node:assert";
import { UserAlreadyExists } from "../errors/user-already-exists";

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
  public findById(id: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(new User(new Date(), new Date(), "email@gmail.com", "username"));
    });
  }
  public findByEmail(email: string): Promise<User | undefined> {
    return new Promise((resolve) => {
      resolve(new User(new Date(), new Date(), email, "username"));
    });
  }
  public deleteById(id: string): Promise<void> {
    return new Promise((resolve) => {
      resolve();
    });
  }
}

describe("DeleteUserUseCase", () => {
  let userRepository: UserRepository;
  let deleteByIdSpy = mock.fn();

  beforeEach(() => {
    mock.reset();
    userRepository = new UserRepositoryTest();
  });

  it("should throw an error if the user does not exist", async () => {
    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    try {
      await deleteUserUseCase.execute(userId);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserAlreadyExists);
      assert.deepStrictEqual(error, new UserAlreadyExists());
    }
  });
  it("should delete a user", async () => {
    mock.method(UserRepositoryTest.prototype, "findById", deleteByIdSpy);

    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    await deleteUserUseCase.execute(userId);
    assert.ok(deleteByIdSpy.mock.calls.length === 1);
    assert.deepStrictEqual(deleteByIdSpy.mock.calls[0].arguments[0], userId);
  });
});
