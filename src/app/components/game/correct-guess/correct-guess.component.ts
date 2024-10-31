import { Component, input } from "@angular/core";
import { Song } from "@models/Game";
import { ButtonComponent } from "../../common/button/button.component";
import { ModalComponent } from "../../common/modal/modal.component";

@Component({
  selector: "app-correct-guess",
  standalone: true,
  imports: [ButtonComponent, ModalComponent],
  templateUrl: "./correct-guess.component.html",
})
export class CorrectGuessComponent {
  song = input({} as Song);
}
