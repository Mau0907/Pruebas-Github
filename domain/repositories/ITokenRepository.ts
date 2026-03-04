import { Card } from "../entities/Card";

export interface ITokenRepository {
  saveToken(token: string, card: Card): Promise<void>;
  getCardByToken(token: string): Promise<Omit<Card, "cvv"> | null>;
}