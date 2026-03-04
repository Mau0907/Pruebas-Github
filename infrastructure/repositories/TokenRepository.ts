import { ITokenRepository } from "../../domain/repositories/ITokenRepository";
import { redisClient } from "../database/redis";
import { Card } from "../../domain/entities/Card";

export class TokenRepository implements ITokenRepository {
  private TTL = 900; // 15 minutos

  async saveToken(token: string, card: Card): Promise<void> {
    await redisClient.set(
      token,
      JSON.stringify(card),
      "EX",
      this.TTL
    );
  }

  async getCardByToken(token: string) {
    const data = await redisClient.get(token);
    if (!data) return null;

    const parsed: Card = JSON.parse(data);

    const { cvv, ...cardWithoutCVV } = parsed;
    return cardWithoutCVV;
  }
}