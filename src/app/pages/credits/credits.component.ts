import { Component } from "@angular/core";
import { HeaderComponent } from "../../components/layout/header/header.component";
import { MainLayoutComponent } from "../../components/layout/main-layout/main-layout.component";

@Component({
  selector: "app-credits",
  standalone: true,
  imports: [HeaderComponent, MainLayoutComponent],
  templateUrl: "./credits.component.html",
  styleUrl: "./credits.component.css",
})
export class CreditsComponent {}
