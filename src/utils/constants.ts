import { Difficulty } from "@models/Game";

export const LEADERS = "leaders";
export const SONGS = "songs";

export const GAME_PROPS = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "easy": {
      return {
        hearts: 5,
        hints: 3,
        multiplier: 1,
        skips: 3,
        clipDuration: 6,
      };
    }

    case "medium": {
      return {
        hearts: 4,
        hints: 2,
        multiplier: 2,
        skips: 2,
        clipDuration: 3,
      };
    }

    case "hard": {
      return {
        hearts: 3,
        hints: 1,
        multiplier: 3,
        skips: 1,
        clipDuration: 1,
      };
    }

    case "legendary": {
      return {
        hearts: 1,
        hints: 0,
        multiplier: 5,
        skips: 0,
        clipDuration: 0.5,
      };
    }
  }
};

export const GAME = {
  HEARTS: "hearts",
  SCORE: "score",
  LEVEL: "level",
  SKIPS: "skips",
  PLAYER_NAME: "playerName",
  HINTS: "hints",
  DIFFICULTY: "difficulty",
  GAME_OVER: "gameOver",
} as const;
