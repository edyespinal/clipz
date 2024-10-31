import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ModalComponent } from "@components/common/modal/modal.component";
import { ButtonComponent } from "@components/common/button/button.component";
import { GameService } from "@services/game.service";

@Component({
  selector: "app-game-over",
  standalone: true,
  imports: [ModalComponent, ButtonComponent, RouterLink],
  templateUrl: "./game-over.component.html",
})
export class GameOverComponent {
  gameService = inject(GameService);
  game = this.gameService.gameState.asReadonly();
}
