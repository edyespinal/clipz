import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CompareStringsService {
  /** Using the Damerau-Levenshtein distance algorithm */
  public compareStrings(string1: string, string2: string) {
    console.time("compareStrings");

    const str1 = string1.toLowerCase();
    const str2 = string2.toLowerCase();

    const str1Length = str1.length;
    const str2Length = str2.length;
    const dictionary: Record<string, number> = {};

    const distances: number[][] = [];

    for (let i = 0; i <= str1Length; i++) {
      distances[i] = [];
      distances[i][0] = i;
    }

    for (let j = 0; j <= str2Length; j++) {
      distances[0][j] = j;
    }

    for (let i = 1; i <= str1Length; i++) {
      dictionary[str1[i]] = 0;
    }

    for (let j = 1; j <= str2Length; j++) {
      dictionary[str2[j]] = 0;
    }

    for (let i = 1; i <= str1Length; i++) {
      let db = 0;

      for (let j = 1; j <= str2Length; j++) {
        const i1 = dictionary[str2[j - 1]];
        const j1 = db;

        let cost = 0;

        if (str1[i - 1] === str2[j - 1]) {
          db = j;
        } else {
          cost = 1;
        }

        distances[i][j] = Math.min(
          distances[i - 1][j] + 1,
          distances[i][j - 1] + 1,
          distances[i - 1][j - 1] + cost,
        );

        if (i1 > 0 && j1 > 0) {
          distances[i][j] = Math.min(
            distances[i][j],
            distances[i1 - 1][j1 - 1] + (i - i1 - 1) + (j - j1 - 1) + 1,
          );
        }
      }
      dictionary[str1[i - 1]] = i;
    }

    console.log(distances);
    console.log(distances[str1Length][str2Length]);

    const distance = distances[str1Length][str2Length];

    if (distance > 6) {
      return false;
    }

    return true;
  }
}
