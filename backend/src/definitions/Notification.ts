import {iUser} from "./User";

export interface iNotification {
  text: string;
  user: iUser;
}

export enum eChannel {
  SMS = "SMS",
  EMAIL = "EMAIL",
  PUSH = "PUSH",
}

export enum eCategory {
  SPORTS = "SPORTS",
  FINANCE = "FINANCE",
  MOVIES = "MOVIES",
}

export interface Deliverables {
  send(): void;
}