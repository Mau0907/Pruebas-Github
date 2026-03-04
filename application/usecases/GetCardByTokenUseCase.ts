import { ITokenRepository } from "../../domain/repositories/ITokenRepository";

export class GetCardByTokenUseCase {
  constructor(private repository: ITokenRepository) {}

  async execute(token: string) {
    return await this.repository.getCardByToken(token);
  }
}