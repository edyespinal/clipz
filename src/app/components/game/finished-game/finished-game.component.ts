import { Component, inject, input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "@components/common/button/button.component";
import { ModalComponent } from "@components/common/modal/modal.component";
import { GameService } from "@services/game.service";

@Component({
  selector: "app-finished-game",
  standalone: true,
  imports: [ButtonComponent, RouterLink, ModalComponent],
  templateUrl: "./finished-game.component.html",
})
export class FinishedGameComponent {
  gameService = inject(GameService);
  game = this.gameService.gameState.asReadonly();
}
