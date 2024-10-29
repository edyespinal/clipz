import { Component, inject, OnInit, signal } from "@angular/core";
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
  ],
  templateUrl: "./game.component.html",
  styleUrl: "./game.component.css",
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
