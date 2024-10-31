import { Component, input } from "@angular/core";

@Component({
  selector: "app-modal",
  standalone: true,
  imports: [],
  templateUrl: "./modal.component.html",
})
export class ModalComponent {
  title = input<string>("");
}
