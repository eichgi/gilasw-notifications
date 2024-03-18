import {eCategory, eChannel} from "./Notification";

export interface iUser {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  subscribedChannels: eChannel[];
  subscribedCategories: eCategory[];
}