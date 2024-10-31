import { Difficulty } from "./Game";

export type Leader = {
  id: string;
  userId?: string;
  name: string;
  score: number;
  difficulty: Difficulty;
};

export type LeaderInput = Omit<Leader, "id">;
