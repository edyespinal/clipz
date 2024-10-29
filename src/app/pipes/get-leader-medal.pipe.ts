import { Pipe, PipeTransform } from "@angular/core";
import { Leader } from "@models/Leader";

@Pipe({
  name: "getLeaderMedal",
  standalone: true,
})
export class GetLeaderMedalPipe implements PipeTransform {
  transform(leader: Leader, position: number): unknown {
    if (position === 0) {
      return "🥇";
    } else if (position === 1) {
      return "🥈";
    } else if (position === 2) {
      return "🥉";
    } else {
      return "";
    }
  }
}
