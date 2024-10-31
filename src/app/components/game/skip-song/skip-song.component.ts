import { Component, inject } from "@angular/core";
import { ButtonComponent } from "@components/common/button/button.component";
import { ModalComponent } from "@components/common/modal/modal.component";
import { GameService } from "@services/game.service";

@Component({
  selector: "app-skip-song",
  standalone: true,
  imports: [ModalComponent, ButtonComponent],
  templateUrl: "./skip-song.component.html",
})
export class SkipSongComponent {
  gameService = inject(GameService);
}
