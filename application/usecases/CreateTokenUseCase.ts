import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { Card } from "../../domain/entities/Card";
import { generateToken } from "../../utils/tokenGenerator";

export class CreateTokenUseCase {
  constructor(private repository: ITokenRepository) {}

  async execute(card: Card): Promise<string> {
    const token = generateToken();
    await this.repository.saveToken(token, card);
    return token;
  }
}
