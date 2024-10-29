export type Leader = {
  id: string;
  userId?: string;
  name: string;
  score: number;
  difficulty: number;
};

export type LeaderInput = Omit<Leader, "id">;
