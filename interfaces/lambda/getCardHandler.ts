import { APIGatewayProxyHandler } from "aws-lambda";
import { TokenRepository } from "../../infrastructure/repositories/TokenRepository";
import { GetCardByTokenUseCase } from "../../application/usecases/GetCardByTokenUseCase";

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const token = event.pathParameters?.token;

    if (!token || token.length !== 16) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Token inválido" }),
      };
    }

    const repository = new TokenRepository();
    const useCase = new GetCardByTokenUseCase(repository);

    const card = await useCase.execute(token);

    if (!card) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Token expirado o no encontrado" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify(card),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};