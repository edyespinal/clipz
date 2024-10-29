import { Component, inject, input } from "@angular/core";
import { ModalComponent } from "../../common/modal/modal.component";
import { ButtonComponent } from "../../common/button/button.component";
import { RouterLink } from "@angular/router";
import { GameService } from "@services/game.service";

@Component({
  selector: "app-end-game",
  standalone: true,
  imports: [ModalComponent, ButtonComponent, RouterLink],
  templateUrl: "./end-game.component.html",
  styleUrl: "./end-game.component.css",
})
export class EndGameComponent {
  gameService = inject(GameService);
}
