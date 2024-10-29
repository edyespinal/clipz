import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",

    loadComponent: () =>
      import("./pages/home/home.component").then((c) => c.HomeComponent),
  },
  {
    path: "game",
    loadComponent: () =>
      import("./pages/game/game.component").then((c) => c.GameComponent),
  },
  {
    path: "leader-board",
    loadComponent: () =>
      import("./pages/leader-board/leader-board.component").then(
        (c) => c.LeaderBoardComponent,
      ),
  },
  {
    path: "rules",
    loadComponent: () =>
      import("./pages/rules/rules.component").then((c) => c.RulesComponent),
  },
  {
    path: "credits",
    loadComponent: () =>
      import("./pages/credits/credits.component").then(
        (c) => c.CreditsComponent,
      ),
  },
  {
    path: "**",
    loadComponent: () =>
      import("./pages/not-found/not-found.component").then(
        (c) => c.NotFoundComponent,
      ),
  },
];
