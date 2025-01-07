import assert from "assert/strict";
import { describe, it, beforeEach } from "node:test";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserInvalid } from "../errors/create-user-invalid";
import { CreateUserDTO } from "../dto/create-user.dto";
import { UserAlreadyExists } from "../errors/user-already-exists";
import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user.repository";
import { UserRepositoryMock } from "./mocks/user.repository.mock";

describe("Create User Use Case", () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryMock();
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
  it("should create a new user", async () => {
    userRepository.findByEmail = async () => undefined;
    const user = new CreateUserDTO();
    user.email = "test@gmail.com";
    user.username = "test";
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const newUser = await createUserUseCase.execute(user);
    assert.ok(newUser instanceof User);
    assert.strictEqual(newUser.getEmail(), user.email);
    assert.strictEqual(newUser.getUsername(), user.username);
    assert.ok(newUser.getId());
  });
});
