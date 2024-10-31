import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { HeaderComponent } from "@components/layout/header/header.component";
import { ButtonComponent } from "@components/common/button/button.component";
import { FooterComponent } from "@components/layout/footer/footer.component";
import { MainLayoutComponent } from "@components/layout/main-layout/main-layout.component";
import { Difficulty } from "@models/Game";
import { GameService } from "@services/game.service";
import { FormsModule } from "@angular/forms";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    RouterLink,
    FooterComponent,
    MainLayoutComponent,
    FormsModule,
  ],
  animations: [
    trigger("openClose", [
      state(
        "open",
        style({
          height: "300px",
        }),
      ),
      state(
        "closed",
        style({
          height: 0,
        }),
      ),
      transition("open => closed", [animate("0.1s")]),
      transition("closed => open", [animate("0.1s")]),
    ]),
  ],
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  gameService = inject(GameService);
  router = inject(Router);
  isOpen = signal(false);
  playerName = signal("");

  toggleIsOpen() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  startGame(difficulty: Difficulty) {
    this.gameService.setState({ playerName: this.playerName() });

    this.router.navigate(["/game"], {
      queryParams: {
        difficulty,
      },
    });
  }
}
