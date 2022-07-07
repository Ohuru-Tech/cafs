import { User } from "./user";

export interface UserState {
  userInfo: User | null;
  loggedIn: boolean;
}

export interface locationState {
  from: string;
}
