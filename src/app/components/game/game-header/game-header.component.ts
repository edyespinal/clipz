import { Component, inject, input, signal } from "@angular/core";
import { ButtonComponent } from "../../common/button/button.component";
import { AsyncPipe, NgClass } from "@angular/common";
import { GameService } from "@services/game.service";
import { HeartComponent } from "../heart/heart.component";

@Component({
  selector: "app-game-header",
  standalone: true,
  imports: [ButtonComponent, NgClass, AsyncPipe, HeartComponent],
  templateUrl: "./game-header.component.html",
  styleUrl: "./game-header.component.css",
})
export class GameHeaderComponent {
  gameService = inject(GameService);
  game = this.gameService.gameState.asReadonly();

  endGame = () => this.gameService.endGame();
}
