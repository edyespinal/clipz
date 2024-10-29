import { Pipe, PipeTransform } from "@angular/core";
import { Leader } from "@models/Leader";

@Pipe({
  name: "sortLeaders",
  standalone: true,
})
export class SortLeadersPipe implements PipeTransform {
  transform(leaders: Leader[]): Leader[] {
    return leaders.sort((a, b) => b.score - a.score);
  }
}
