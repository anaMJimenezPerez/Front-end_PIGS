import { User } from "./user";

export interface Follow {
  id?: number;
  followerId: User;
  followedId: User;
}
