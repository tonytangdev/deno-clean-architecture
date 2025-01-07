import { beforeEach, describe, it, mock } from "node:test";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { DeleteUserUseCase } from "./delete-user.use-case";
import assert from "node:assert";
import { UserRepositoryMock } from "../mocks/user.repository.mock";
import { UserNotFound } from "../../errors/users/user-not-found";
import { User } from "../../../domain/entities/user";

describe("DeleteUserUseCase", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    mock.reset();
    userRepository = new UserRepositoryMock();
  });

  it("should throw an error if the user does not exist", async () => {
    mock.method(UserRepositoryMock.prototype, "findById", () => {
      return undefined;
    });

    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    try {
      await deleteUserUseCase.execute(userId);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserNotFound);
      assert.deepStrictEqual(error, new UserNotFound());
    }
  });
  it("should delete a user", async () => {
    const deleteByIdSpy = mock.fn((_: string) => {
      return new User(
        new Date(),
        new Date(),
        "email@email.com",
        "username",
        "123"
      );
    });
    mock.method(UserRepositoryMock.prototype, "findById", deleteByIdSpy);

    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    await deleteUserUseCase.execute(userId);
    assert.ok(deleteByIdSpy.mock.calls.length === 1);
    assert.deepStrictEqual(deleteByIdSpy.mock.calls[0].arguments[0], userId);
  });

  it("throw an error when repository throws an error", async () => {
    const expectedError = new Error("Unexpected error");
    mock.method(UserRepositoryMock.prototype, "deleteById", () => {
      throw expectedError;
    });

    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    try {
      await deleteUserUseCase.execute(userId);
      assert.fail("An error should have been thrown");
    } catch (error) {
      console.log(error);
      assert.ok(error instanceof Error);
      assert.strictEqual(error, expectedError);
    }
  });
});
