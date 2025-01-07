import { beforeEach, describe, it, mock } from "node:test";
import assert from "node:assert";
import { UserNotFound } from "../../errors/user-not-found";
import { CreateBotUseCase } from "./create-bot.use-case";
import { BotRepositoryMock } from "../mocks/bot.repository.mock";
import { CreateBotDTO } from "../../dto/create-bot.dto";
import { UserRepositoryMock } from "../mocks/user.repository.mock";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { Bot } from "../../../domain/entities/bot";
import { User } from "../../../domain/entities/user";

describe("Create Bot Use Case", () => {
  let userRepository: UserRepository;
  let botRepository: BotRepository;

  beforeEach(() => {
    mock.reset();
    userRepository = new UserRepositoryMock();
    botRepository = new BotRepositoryMock();
  });

  it("should throw an error when the user does not exist", async () => {
    mock.method(UserRepositoryMock.prototype, "findById", () => undefined);

    const userId = "123";
    const botDTO = new CreateBotDTO();
    botDTO.prompt = "prompt";
    botDTO.userId = userId;
    const createBotUseCase = new CreateBotUseCase(
      userRepository,
      botRepository
    );

    try {
      await createBotUseCase.execute(botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserNotFound);
      assert.deepStrictEqual(error, new UserNotFound());
    }
  });
  it("should throw an error when the user repository throws an error", async () => {
    const expectedError = new Error();
    mock.method(UserRepositoryMock.prototype, "findById", () => {
      throw expectedError;
    });

    const userId = "123";
    const botDTO = new CreateBotDTO();
    botDTO.prompt = "prompt";
    botDTO.userId = userId;
    const createBotUseCase = new CreateBotUseCase(
      userRepository,
      botRepository
    );

    try {
      await createBotUseCase.execute(botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error, expectedError);
    }
  });
  it("should throw an error when the bot repository throws an error", async () => {
    const expectedError = new Error();
    mock.method(BotRepositoryMock.prototype, "create", (bot: Bot) => {
      throw expectedError;
    });

    const userId = "123";
    const botDTO = new CreateBotDTO();
    botDTO.prompt = "prompt";
    botDTO.userId = userId;
    const createBotUseCase = new CreateBotUseCase(
      userRepository,
      botRepository
    );

    try {
      await createBotUseCase.execute(botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      console.log({ error });
      assert.ok(error instanceof Error);
      assert.strictEqual(error, expectedError);
    }
  });
  it("should create a new bot", async () => {
    const userId = "123";
    const userEmail = "email@test.com";
    const username = "test";
    mock.method(UserRepositoryMock.prototype, "findById", () => {
      return new User(new Date(), new Date(), userEmail, username, userId);
    });

    const botDTO = new CreateBotDTO();
    botDTO.prompt = "prompt";
    botDTO.userId = userId;
    const createBotUseCase = new CreateBotUseCase(
      userRepository,
      botRepository
    );

    const bot = await createBotUseCase.execute(botDTO);

    assert.ok(bot instanceof Bot);
    assert.ok(bot.getId());
    assert.deepStrictEqual(bot.getUser().getId(), userId);
    assert.strictEqual(bot.getPrompt(), "prompt");
  });
});
