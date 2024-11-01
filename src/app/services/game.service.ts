import { computed, inject, Injectable, signal } from "@angular/core";
import { Router } from "@angular/router";
import { Difficulty, Game } from "@models/Game";
import { SongsService } from "./songs.service";
import { CompareStringsService } from "./compare-strings.service";
import { LeaderBoardService } from "./leader-board.service";
import { GAME_PROPS } from "@utils/constants";
import { getAnalytics, logEvent } from "@angular/fire/analytics";

@Injectable({
  providedIn: "root",
})
export class GameService {
  songsService = inject(SongsService);
  compareService = inject(CompareStringsService);
  leaderBoardService = inject(LeaderBoardService);
  router = inject(Router);
  analytics = getAnalytics();

  isLoading = signal(true);
  showCorrectGuess = signal(false);
  showIncorrectGuess = signal(false);
  showGameOver = signal(false);
  showGameFinished = signal(false);
  showGameEnded = signal(false);
  showSongSkipped = signal(false);
  isGuessDisabled = signal(false);

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
    const { multiplier, hearts, skips, hints, clipDuration } =
      GAME_PROPS(difficulty);

    this.setState({
      difficulty: difficulty,
      score: 0,
      scoreMultiplier: multiplier,
      hearts,
      skips,
      hints,
      playerGuess: "",
      songs,
      level: 1,
      clipDuration,
      gameFinished: false,
      gameEnded: false,
      gameOver: false,
      lowestHighScore,
    });

    setTimeout(() => {
      this.isLoading.set(false);
    }, 250);

    logEvent(this.analytics, "game_started", {
      rankedMode: !!this.gameState().playerName,
      difficulty: this.gameState().difficulty,
    });
  }

  public playSong() {
    this.showIncorrectGuess.set(false);
    this.audio.src = `audio/${this.gameState().songs[this.gameState().level - 1].index}.m4a#t=,${this.gameState().clipDuration}`;
    this.audio.currentTime = 0;
    this.audio.play();
  }

  public guessSong() {
    if (this.isGuessDisabled()) {
      return;
    }

    this.audio.pause();

    const { playerGuess } = this.gameState();
    const currentSong = this.gameState().songs[this.gameState().level - 1].name;

    if (!this.compareService.compareStrings(playerGuess, currentSong)) {
      this.showIncorrectGuess.set(true);

      const hearts = this.gameState().hearts - 1;

      if (hearts === 0) {
        return this.gameOver();
      }

      this.setState({
        hearts,
      });

      setTimeout(() => {
        this.showIncorrectGuess.set(false);
      }, 250);

      return;
    }

    if (this.gameState().level === this.gameState().songs.length) {
      return this.finishedGame();
    }

    this.showCorrectGuess.set(true);
    this.isGuessDisabled.set(true);

    this.setState({
      score: this.gameState().score + this.gameState().scoreMultiplier,
    });
  }

  public continueGame() {
    this.showCorrectGuess.set(false);
    this.isGuessDisabled.set(false);

    if (this.gameState().level < this.gameState().songs.length) {
      this.levelUp();
    } else {
      this.finishedGame();
    }
  }

  public skipSong() {
    this.showSongSkipped.set(false);

    this.setState({ skips: this.gameState().skips - 1 });

    if (this.gameState().level < this.gameState().songs.length) {
      this.setState({ hearts: this.gameState().hearts - 1 });
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

  private gameOver() {
    this.showGameOver.set(true);

    if (
      this.gameState().playerName &&
      this.gameState().score > this.gameState().lowestHighScore
    ) {
      this.leaderBoardService.addLeader({
        name: this.gameState().playerName,
        score: this.gameState().score,
        difficulty: this.gameState().difficulty,
      });
    }
  }

  private finishedGame() {
    logEvent(this.analytics, "game_finished", {
      rankedMode: !!this.gameState().playerName,
      difficulty: this.gameState().difficulty,
      score: this.gameState().score,
    });

    this.showGameFinished.set(true);

    this.setState({ score: this.gameState().score * 2 });

    if (
      this.gameState().playerName &&
      this.gameState().score > this.gameState().lowestHighScore
    ) {
      this.leaderBoardService.addLeader({
        name: this.gameState().playerName,
        score: this.gameState().score,
        difficulty: this.gameState().difficulty,
      });
    }
  }

  public restartGame() {
    this.isLoading.set(true);
    this.showGameOver.set(false);
    this.showGameFinished.set(false);
    this.showSongSkipped.set(false);
    this.initializeGame(this.gameState().difficulty);
  }

  public endGame() {
    this.showGameEnded.set(false);
    this.audio.pause();
    this.router.navigate(["/"]);
  }

  public cancelEndGame() {
    this.showGameEnded.set(false);
  }
}
