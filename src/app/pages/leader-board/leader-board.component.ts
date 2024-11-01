import { Component, inject, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "../../components/layout/header/header.component";
import { ButtonComponent } from "../../components/common/button/button.component";
import { LeaderBoardService } from "@services/leader-board.service";
import { Leader } from "@models/Leader";
import { GetLeaderMedalPipe } from "@pipes/get-leader-medal.pipe";
import { MainLayoutComponent } from "../../components/layout/main-layout/main-layout.component";
import { LoaderComponent } from "../../components/common/loader/loader.component";

@Component({
  selector: "app-leader-board",
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    GetLeaderMedalPipe,
    MainLayoutComponent,
    LoaderComponent,
  ],
  templateUrl: "./leader-board.component.html",
})
export class LeaderBoardComponent implements OnInit {
  leaderBoardService = inject(LeaderBoardService);
  leaders = signal<Leader[]>([]);
  isLoading = signal(true);

  async ngOnInit() {
    const leaders = await this.leaderBoardService.getLeaders();

    this.leaders.set(leaders);
    this.isLoading.set(false);
  }
}
