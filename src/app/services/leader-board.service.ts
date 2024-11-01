import { inject, Injectable } from "@angular/core";
import {
  addDoc,
  collection,
  Firestore,
  getDocs,
} from "@angular/fire/firestore";
import { Leader, LeaderInput } from "@models/Leader";
import { LEADERS } from "@utils/constants";

@Injectable({
  providedIn: "root",
})
export class LeaderBoardService {
  firestore = inject(Firestore);

  public async getLeaders(): Promise<Leader[]> {
    try {
      const leaderBoardRef = collection(this.firestore, LEADERS).withConverter({
        toFirestore: (data: Leader) => data,
        fromFirestore: (snapshot, options) => snapshot.data(options) as Leader,
      });

      const snapshot = await getDocs(leaderBoardRef);

      if (snapshot.docs.length === 0) {
        return [];
      }

      return snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .sort((a, b) => b.score - a.score);
    } catch {
      console.error("Failed to get leaders");

      return [];
    }
  }

  public async getLowestScore() {
    try {
      const leaders = await this.getLeaders();

      if (leaders.length === 0 || leaders.length < 10) {
        return 0;
      }

      return leaders.sort((a, b) => a.score - b.score)[0].score;
    } catch {
      return 0;
    }
  }

  public async addLeader(leader: LeaderInput) {
    try {
      const leaderBoardRef = collection(this.firestore, LEADERS).withConverter({
        toFirestore: (data: LeaderInput) => data,
        fromFirestore: (snapshot, options) =>
          snapshot.data(options) as LeaderInput,
      });

      await addDoc(leaderBoardRef, leader);

      return {
        success: true,
        message: "Successfully added leader",
      };
    } catch {
      return {
        success: false,
        message: "Failed to add leader",
      };
    }
  }
}
