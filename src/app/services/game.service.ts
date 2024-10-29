import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Difficulty, Game, Song } from "@models/Game";
import { SongsService } from "./songs.service";
import { CompareStringsService } from "./compare-strings.service";
import { LeaderBoardService } from "./leader-board.service";
import { DIFFICULTY } from "@utils/constants";

@Injectable({
  providedIn: "root",
})
export class GameService {
  songsService = inject(SongsService);
  compareService = inject(CompareStringsService);
  leaderBoardService = inject(LeaderBoardService);
  router = inject(Router);
  audio = new Audio();

  readonly gameState = signal({} as Game);

  public set<K extends keyof Game>(key: K, value: Game[K]) {
    this.gameState.update((game) => ({ ...game, [key]: value }));
  }

  public setState(partialState: Partial<Game>) {
    this.gameState.update((game) => ({ ...game, ...partialState }));
  }

  public select<K extends keyof Game>(key: K) {
    return computed(() => this.gameState()[key]);
  }

  async initializeGame(difficulty: Difficulty) {
    const songs = await this.songsService.getSongs();
    const lowestHighScore = await this.leaderBoardService.getLowestScore();

    this.setState({
      difficulty: difficulty,
      score: 0,
      hearts: +difficulty + 2,
      playerGuess: "",
      songs,
      level: 1,
      showCorrectGuess: false,
      gameFinished: false,
      endgame: false,
      disableGuess: false,
      gameOver: false,
      lowestHighScore,
    });
  }

  public playSong() {
    this.audio.src = `audio/${this.gameState().songs[this.gameState().level - 1].index}.m4a#t=,${this.gameState().difficulty}`;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  public guessSong() {
    if (this.gameState().disableGuess) {
      return;
    }

    this.audio.pause();

    const { playerGuess } = this.gameState();
    const currentSong = this.gameState().songs[this.gameState().level - 1].name;

    if (!this.compareService.compareStrings(playerGuess, currentSong)) {
      this.setState({ hearts: this.gameState().hearts - 1 });

      if (this.gameState().hearts === 0) {
        return this.gameOver();
      }

      return;
    }

    if (this.gameState().level === this.gameState().songs.length) {
      return this.finishedGame();
    }

    this.setState({
      score: this.gameState().score + 1,
      showCorrectGuess: true,
      disableGuess: true,
    });
  }

  public continueGame() {
    this.setState({
      showCorrectGuess: false,
      disableGuess: false,
    });

    if (this.gameState().level < this.gameState().songs.length) {
      this.levelUp();
    } else {
      this.finishedGame();
    }
  }

  private levelUp() {
    this.setState({
      level: this.gameState().level + 1,
      playerGuess: "",
    });
  }

  private calculateTotalScore() {
    let multiplier = 1;

    switch (this.gameState().difficulty) {
      case DIFFICULTY.EASY: {
        multiplier = 1;
        break;
      }

      case DIFFICULTY.MEDIUM: {
        multiplier = 2;
        break;
      }

      case DIFFICULTY.HARD: {
        multiplier = 3;
        break;
      }
    }

    return this.gameState().score * multiplier;
  }

  private gameOver() {
    this.setState({ gameOver: true });

    if (
      this.gameState().playerName &&
      this.gameState().score > this.gameState().lowestHighScore
    ) {
      this.leaderBoardService.addLeader({
        name: this.gameState().playerName,
        score: this.calculateTotalScore(),
        difficulty: this.gameState().difficulty,
      });
    }
  }

  private finishedGame() {
    this.setState({ gameFinished: true });

    if (
      this.gameState().playerName &&
      this.gameState().score > this.gameState().lowestHighScore
    ) {
      this.leaderBoardService.addLeader({
        name: this.gameState().playerName,
        score: this.calculateTotalScore(),
        difficulty: this.gameState().difficulty,
      });
    }
  }

  public restartGame() {
    this.initializeGame(this.gameState().difficulty);
  }

  public endGame() {
    this.setState({ endgame: true });
  }

  public cancelEndGame() {
    this.setState({ endgame: false });
  }
}
