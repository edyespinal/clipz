import { Component, inject } from "@angular/core";
import { ButtonComponent } from "../../common/button/button.component";
import { AsyncPipe } from "@angular/common";
import { GameService } from "@services/game.service";
import { HeartComponent } from "../heart/heart.component";

@Component({
  selector: "app-game-header",
  standalone: true,
  imports: [ButtonComponent, AsyncPipe, HeartComponent],
  templateUrl: "./game-header.component.html",
})
export class GameHeaderComponent {
  gameService = inject(GameService);
  game = this.gameService.gameState.asReadonly();

  endGame = () => this.gameService.endGame();
}
