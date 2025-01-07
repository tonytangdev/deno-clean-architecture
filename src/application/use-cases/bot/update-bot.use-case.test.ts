import { beforeEach, describe, it, mock } from "node:test";
import { BotRepository } from "../../../domain/repositories/bot.repository";
import { BotRepositoryMock } from "../mocks/bot.repository.mock";
import { UpdateBotUseCase } from "./update-bot.use-case";
import assert from "node:assert";
import { UpdateBotDTO } from "../../dto/bots/update-bot.dto";
import { UserRepository } from "../../../domain/repositories/user.repository";
import { UserRepositoryMock } from "../mocks/user.repository.mock";
import { UserNotFound } from "../../errors/users/user-not-found";
import { BotNotFound } from "../../errors/bots/bot-not-found";
import { Bot } from "../../../domain/entities/bot";

describe("Update Bot Use Case", () => {
  let botRepository: BotRepository;
  let userRepository: UserRepository;

  beforeEach(() => {
    mock.reset();
    botRepository = new BotRepositoryMock();
    userRepository = new UserRepositoryMock();
  });

  it("throws when user repository throws", async () => {
    const expectedError = new Error();

    mock.method(UserRepositoryMock.prototype, "findById", () => {
      throw expectedError;
    });

    const updateBotUseCase = new UpdateBotUseCase(
      userRepository,
      botRepository
    );

    const botDTO = new UpdateBotDTO();
    botDTO.prompt = "prompt2";

    try {
      await updateBotUseCase.execute("123", botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error, expectedError);
    }
  });

  it("throws when user does not exist", async () => {
    mock.method(UserRepositoryMock.prototype, "findById", () => undefined);

    const updateBotUseCase = new UpdateBotUseCase(
      userRepository,
      botRepository
    );

    const botDTO = new UpdateBotDTO();
    botDTO.prompt = "prompt2";

    try {
      await updateBotUseCase.execute("123", botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserNotFound);
      assert.deepStrictEqual(error, new UserNotFound());
    }
  });

  it("throws when bot repository throws", async () => {
    const expectedError = new Error();
    const updateBotMock = mock.fn(() => {
      throw expectedError;
    });
    mock.method(BotRepositoryMock.prototype, "update", updateBotMock);

    const updateBotUseCase = new UpdateBotUseCase(
      userRepository,
      botRepository
    );

    const botDTO = new UpdateBotDTO();
    try {
      await updateBotUseCase.execute("123", botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof Error);
      assert.strictEqual(error, expectedError);
    }
  });
  it("throws when bot does not exist", async () => {
    const expectedError = new BotNotFound();
    mock.method(BotRepositoryMock.prototype, "findById", () => undefined);

    const updateBotUseCase = new UpdateBotUseCase(
      userRepository,
      botRepository
    );

    const botDTO = new UpdateBotDTO();
    botDTO.id = "123";
    botDTO.prompt = "prompt2";

    try {
      await updateBotUseCase.execute("123", botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof BotNotFound);
      assert.deepStrictEqual(error, expectedError);
    }
  });
  it("updates the bot", async () => {
    const updateBotMock = mock.fn((bot: Bot) => {
      return bot;
    });
    mock.method(BotRepositoryMock.prototype, "update", updateBotMock);

    const updateBotUseCase = new UpdateBotUseCase(
      userRepository,
      botRepository
    );

    const botDTO = new UpdateBotDTO();
    botDTO.id = "123";
    botDTO.prompt = "prompt2";

    const bot = await updateBotUseCase.execute("123", botDTO);
    assert.ok(bot instanceof Bot);
    assert.strictEqual(bot.getPrompt(), botDTO.prompt);
  });
});
