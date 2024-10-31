import { Component, input, signal } from "@angular/core";

@Component({
  selector: "app-heart",
  standalone: true,
  imports: [],
  templateUrl: "./heart.component.html",
})
export class HeartComponent {
  fill = input();
}
