export const createUserInvalidErrorMessage = "User is invalid";
export class CreateUserInvalid extends Error {
  constructor() {
    super(createUserInvalidErrorMessage);
    this.name = "CreateUserInvalid";
  }
}