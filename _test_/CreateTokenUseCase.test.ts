import { CreateTokenUseCase } from "../application/usecases/CreateTokenUseCase";

describe("CreateTokenUseCase", () => {
  it("should generate a 16 character token", async () => {
    const mockRepo: any = {
      saveToken: jest.fn(),
    };

    const useCase = new CreateTokenUseCase(mockRepo);

    const token = await useCase.execute({
      cardNumber: "4111111111111111",
      cvv: "123",
      expirationMonth: "12",
      expirationYear: "25",
      email: "test@test.com",
    });

    expect(token.length).toBe(16);
  });
});