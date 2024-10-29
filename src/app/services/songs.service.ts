import { inject, Injectable } from "@angular/core";
import { collection, Firestore, getDocs } from "@angular/fire/firestore";
import { Song } from "@models/Game";
import { SONGS } from "@utils/constants";

@Injectable({
  providedIn: "root",
})
export class SongsService {
  firestore = inject(Firestore);

  /** Using the Fisher-Yates Shuffle algorithm  */
  private shuffle(array: Song[]) {
    let currentIndex = array.length;

    while (currentIndex !== 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  public async getSongs() {
    const songCollectionRef = collection(this.firestore, SONGS).withConverter({
      toFirestore: (data: Song) => data,
      fromFirestore: (snapshot, options) => snapshot.data(options) as Song,
    });

    const snapshot = await getDocs(songCollectionRef);

    const songs = snapshot.docs.map((doc) => doc.data());

    return this.shuffle(songs);
  }
}
