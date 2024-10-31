export type Game = {
  playerName: string;
  hearts: number;
  hints: number;
  score: number;
  scoreMultiplier: number;
  difficulty: Difficulty;
  playerGuess: string;
  songs: Song[];
  level: number;
  skips: number;
  gameFinished: boolean;
  gameEnded: boolean;
  gameOver: boolean;
  lowestHighScore: number;
};

export type Song = {
  id: string;
  index: string;
  name: string;
  artist: string;
};

export type Difficulty = "easy" | "medium" | "hard" | "legendary";
