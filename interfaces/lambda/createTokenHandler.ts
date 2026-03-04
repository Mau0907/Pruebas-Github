import { APIGatewayProxyHandler } from "aws-lambda";
import { TokenRepository } from "../../infrastructure/repositories/TokenRepository";
import { CreateTokenUseCase } from "../../application/usecases/CreateTokenUseCase";
import { validateCreateTokenBody } from "../../utils/validations";




export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const body = JSON.parse(event.body || "{}");

    validateCreateTokenBody(body);

    const repository = new TokenRepository();
    const useCase = new CreateTokenUseCase(repository);

    const token = await useCase.execute(body);

    return {
      statusCode: 201,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};