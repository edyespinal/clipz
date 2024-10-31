import { Component, inject, OnInit, signal, viewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { GameHeaderComponent } from "../../components/game/game-header/game-header.component";
import { ButtonComponent } from "../../components/common/button/button.component";
import { GameService } from "@services/game.service";
import { PlayButtonComponent } from "../../components/game/play-button/play-button.component";
import { ActivatedRoute } from "@angular/router";
import { Difficulty } from "@models/Game";
import { CorrectGuessComponent } from "../../components/game/correct-guess/correct-guess.component";
import { FinishedGameComponent } from "../../components/game/finished-game/finished-game.component";
import { EndGameComponent } from "../../components/game/end-game/end-game.component";
import { GameOverComponent } from "@components/game/game-over/game-over.component";
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { NgClass } from "@angular/common";
import { SkipSongComponent } from "../../components/game/skip-song/skip-song.component";
import { LoaderComponent } from "../../components/common/loader/loader.component";

@Component({
  selector: "app-game",
  standalone: true,
  imports: [
    GameHeaderComponent,
    ButtonComponent,
    FormsModule,
    PlayButtonComponent,
    CorrectGuessComponent,
    FinishedGameComponent,
    GameOverComponent,
    EndGameComponent,
    NgClass,
    SkipSongComponent,
    LoaderComponent,
  ],
  animations: [
    trigger("shake", [
      state(
        "true",
        style({
          transform: "translateX(5px)",
        }),
      ),
      state(
        "false",
        style({
          transform: "translateX(0)",
        }),
      ),
      transition(
        "false <=> true",
        animate(
          250,
          keyframes([
            style({
              transform: "translateX(0)",
            }),
            style({
              transform: "translateX(5px)",
            }),
            style({
              transform: "translateX(0)",
            }),
            style({
              transform: "translateX(-5px)",
            }),
            style({
              transform: "translateX(0)",
            }),
            style({
              transform: "translateX(5px)",
            }),
            style({
              transform: "translateX(0)",
            }),
            style({
              transform: "translateX(-5px)",
            }),
            style({
              transform: "translateX(0)",
            }),
          ]),
        ),
      ),
    ]),
  ],
  templateUrl: "./game.component.html",
})
export class GameComponent implements OnInit {
  gameService = inject(GameService);
  activatedRoute = inject(ActivatedRoute);
  readonly game = this.gameService.gameState.asReadonly();

  ngOnInit() {
    const difficulty = Number(
      this.activatedRoute.snapshot.queryParams["difficulty"],
    ) as Difficulty;

    this.gameService.initializeGame(difficulty);
  }
}
