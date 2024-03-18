import {iUser} from "../definitions/User";
import {eCategory, eChannel} from "../definitions/Notification";

export const users: iUser[] = [
  {
    id: 1,
    name: "Hiram Guerrero",
    email: "hiramg90@gmail.com",
    phoneNumber: "+528331001010",
    subscribedCategories: [eCategory.SPORTS, eCategory.MOVIES],
    subscribedChannels: [eChannel.EMAIL]
  },
  {
    id: 2,
    name: "Jesus Castillo",
    email: "hiramg90@gmail.com",
    phoneNumber: "+528331001011",
    subscribedCategories: [eCategory.FINANCE],
    subscribedChannels: [eChannel.SMS]
  },
  {
    id: 3,
    name: "John Doe",
    email: "johndoe@yopmail.com",
    phoneNumber: "+528331001012",
    subscribedCategories: [eCategory.MOVIES],
    subscribedChannels: [eChannel.PUSH]
  }
]