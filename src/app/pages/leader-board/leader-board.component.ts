import { Component, inject, OnInit, signal } from "@angular/core";
import { HeaderComponent } from "../../components/layout/header/header.component";
import { ButtonComponent } from "../../components/common/button/button.component";
import { LeaderBoardService } from "@services/leader-board.service";
import { Leader } from "@models/Leader";
import { SortLeadersPipe } from "@pipes/sort-leaders.pipe";
import { GetLeaderMedalPipe } from "@pipes/get-leader-medal.pipe";
import { MainLayoutComponent } from "../../components/layout/main-layout/main-layout.component";

@Component({
  selector: "app-leader-board",
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonComponent,
    SortLeadersPipe,
    GetLeaderMedalPipe,
    MainLayoutComponent,
  ],
  templateUrl: "./leader-board.component.html",
  styleUrl: "./leader-board.component.css",
})
export class LeaderBoardComponent implements OnInit {
  leaderBoardService = inject(LeaderBoardService);
  leaders = signal<Leader[]>([]);

  async ngOnInit() {
    const leaders = await this.leaderBoardService.getLeaders();

    this.leaders.set(leaders);
  }
}
