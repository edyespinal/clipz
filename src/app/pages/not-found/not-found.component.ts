import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonComponent } from "../../components/common/button/button.component";
import { MainLayoutComponent } from "../../components/layout/main-layout/main-layout.component";

@Component({
  selector: "app-not-found",
  standalone: true,
  imports: [RouterLink, ButtonComponent, MainLayoutComponent],
  templateUrl: "./not-found.component.html",
})
export class NotFoundComponent {}
