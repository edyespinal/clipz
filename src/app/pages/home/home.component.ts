import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { HeaderComponent } from "@components/layout/header/header.component";
import { ButtonComponent } from "@components/common/button/button.component";
import { FooterComponent } from "@components/layout/footer/footer.component";
import { MainLayoutComponent } from "@components/layout/main-layout/main-layout.component";
import { Difficulty } from "@models/Game";
import { GameService } from "@services/game.service";
import { FormsModule } from "@angular/forms";

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
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
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
        difficulty: difficulty,
      },
    });
  }
}
