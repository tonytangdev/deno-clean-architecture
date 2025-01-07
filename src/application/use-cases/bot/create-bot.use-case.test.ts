import { describe, it, mock } from "node:test";
import assert from "node:assert";
import { UserNotFound } from "../../errors/user-not-found";
import { CreateBotUseCase } from "./create-bot.use-case";
import { BotRepositoryMock } from "../mocks/bot.repository.mock";
import { CreateBotDTO } from "../../dto/create-bot.dto";
import { UserRepositoryMock } from "../mocks/user.repository.mock";

describe("Create Bot Use Case", () => {
  it("should throw an error when the user does not exist", async () => {
    mock.method(UserRepositoryMock.prototype, "findById", () => undefined);

    const userId = "123";
    const botDTO = new CreateBotDTO();
    botDTO.prompt = "prompt";
    botDTO.userId = userId;
    const createBotUseCase = new CreateBotUseCase(
      new UserRepositoryMock(),
      new BotRepositoryMock()
    );

    try {
      await createBotUseCase.execute(botDTO);
      assert.fail("An error should have been thrown");
    } catch (error) {
      assert.ok(error instanceof UserNotFound);
      assert.deepStrictEqual(error, new UserNotFound());
    }
  });
  it.todo("should throw an error when the repository throws an error");
  it.todo("should create a new bot");
});
