import { inject, Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from "@angular/fire/firestore";
import { Difficulty } from "@models/Game";
import { Leader, LeaderInput } from "@models/Leader";
import { LEADERS } from "@utils/constants";

@Injectable({
  providedIn: "root",
})
export class LeaderBoardService {
  firestore = inject(Firestore);

  public async getLeaders() {
    const leaderBoardRef = collection(this.firestore, LEADERS).withConverter({
      toFirestore: (data: Leader) => data,
      fromFirestore: (snapshot, options) => snapshot.data(options) as Leader,
    });

    const docs = await getDocs(leaderBoardRef);

    return docs.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  }

  public async getLowestScore() {
    const leaders = await this.getLeaders();

    if (leaders.length === 0) {
      return 0;
    }

    return leaders.sort((a, b) => a.score - b.score)[0].score;
  }

  public async addLeader(leader: LeaderInput) {
    const leaderBoardRef = collection(this.firestore, LEADERS).withConverter({
      toFirestore: (data: LeaderInput) => data,
      fromFirestore: (snapshot, options) =>
        snapshot.data(options) as LeaderInput,
    });

    await addDoc(leaderBoardRef, leader);
  }
}
