import { Component, input, output } from "@angular/core";
import { cn } from "@utils/cn";

@Component({
  selector: "app-button",
  standalone: true,
  imports: [],
  templateUrl: "./button.component.html",
  styleUrl: "./button.component.css",
})
export class ButtonComponent {
  variant = input<"primary" | "secondary">("primary");
  onClick = output<MouseEvent>();
  class = "min-w-48 font-semibold font-display px-8 py-2 rounded-full";

  onClickEvent(event: MouseEvent) {
    this.onClick.emit(event);
  }

  ngOnInit() {
    if (this.variant() === "primary") {
      this.class = cn(
        this.class,
        "bg-primary text-white hover:bg-primary-light",
      );

      return;
    }

    this.class = cn(this.class, "bg-secondary  hover:bg-secondary-light");
  }
}
