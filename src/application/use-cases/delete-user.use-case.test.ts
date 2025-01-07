import { beforeEach, describe, it, mock } from "node:test";
import { UserRepository } from "../../domain/repositories/user.repository";
import { DeleteUserUseCase } from "./delete-user.use-case";
import assert from "node:assert";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { UserRepositoryMock } from "./mocks/user.repository.mock";

describe("DeleteUserUseCase", () => {
  let userRepository: UserRepository;
  let deleteByIdSpy = mock.fn();

  beforeEach(() => {
    mock.reset();
    userRepository = new UserRepositoryMock();
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
    mock.method(UserRepositoryMock.prototype, "findById", deleteByIdSpy);

    const userId = "123";
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    await deleteUserUseCase.execute(userId);
    assert.ok(deleteByIdSpy.mock.calls.length === 1);
    assert.deepStrictEqual(deleteByIdSpy.mock.calls[0].arguments[0], userId);
  });
});
