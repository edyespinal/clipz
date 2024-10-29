import { Component } from "@angular/core";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-main-layout",
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: "./main-layout.component.html",
  styleUrl: "./main-layout.component.css",
})
export class MainLayoutComponent {}
