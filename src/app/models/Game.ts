export type Game = {
  playerName: string;
  hearts: number;
  score: number;
  difficulty: Difficulty;
  playerGuess: string;
  songs: Song[];
  level: number;
  showCorrectGuess: boolean;
  gameFinished: boolean;
  endgame: boolean;
  disableGuess: boolean;
  gameOver: boolean;
  lowestHighScore: number;
};

export type Song = {
  id: string;
  index: string;
  name: string;
  artist: string;
};

export type Difficulty = 1 | 2 | 3;
