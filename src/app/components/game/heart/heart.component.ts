import { Component, input, signal } from "@angular/core";

@Component({
  selector: "app-heart",
  standalone: true,
  imports: [],
  templateUrl: "./heart.component.html",
  styleUrl: "./heart.component.css",
})
export class HeartComponent {
  fill = input();
  style = signal("");

  ngOnChanges() {
    this.style.set(
      this.fill() === true
        ? "fill: rgb(236, 0, 32); stroke: black; stroke-width: 4.38px"
        : "fill: rgb(255, 255, 255); stroke: black; stroke-width: 4.38px",
    );
  }
}
