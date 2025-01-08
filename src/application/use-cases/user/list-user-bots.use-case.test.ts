import { beforeEach, describe, it, mock } from "node:test";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { BotRepositoryMock } from "../mocks/bot.repository.mock";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UserRepositoryMock } from "../mocks/user.repository.mock";
import { ListUserBotsUseCase } from "./list-user-bots.use-case";
import assert from "node:assert";
import { UserNotFound } from "../../errors/users/user-not-found";
import { Bot } from "../../../domain/entities/bot";

describe("List User Bots Use Case", () => {
  let botRepository: BotRepository;
  let userRepository: UserRepository;

  beforeEach(() => {
    mock.reset();
    botRepository = new BotRepositoryMock();
    userRepository = new UserRepositoryMock();
  });

  it("throws when user does not exist", async () => {
    const userId = "user-id";
    mock.method(UserRepositoryMock.prototype, "findById", () => undefined);

    const listUserBotsUseCase = new ListUserBotsUseCase(
      userRepository,
      botRepository
    );

    try {
      await listUserBotsUseCase.execute(userId);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.ok(error instanceof UserNotFound);
      assert.deepStrictEqual(error, new UserNotFound());
    }
  });
  it("throws when user repository throws", async () => {
    const userId = "user-id";
    const expectedError = new Error("User repository error");
    mock.method(UserRepositoryMock.prototype, "findById", () => {
      throw expectedError;
    });

    const listUserBotsUseCase = new ListUserBotsUseCase(
      userRepository,
      botRepository
    );

    try {
      await listUserBotsUseCase.execute(userId);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.deepStrictEqual(error, expectedError);
    }
  });
  it.todo("throws when bot repository throws", async () => {
    const userId = "user-id";
    const expectedError = new Error("Bot repository error");
    mock.method(BotRepositoryMock.prototype, "findBotsByUserId", () => {
      throw expectedError;
    });

    const listUserBotsUseCase = new ListUserBotsUseCase(
      userRepository,
      botRepository
    );

    try {
      await listUserBotsUseCase.execute(userId);
      assert.fail("Should have thrown an error");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.deepStrictEqual(error, expectedError);
    }
  });
  it("returns a list of bots", async () => {
    const userId = "user-id";

    const listUserBotsUseCase = new ListUserBotsUseCase(
      userRepository,
      botRepository
    );

    const bots = await listUserBotsUseCase.execute(userId);
    assert.ok(Array.isArray(bots));
    for (const bot of bots) {
      assert.ok(bot instanceof Bot);
      assert.strictEqual(bot.getUser().getId(), userId);
    }
  });
});
