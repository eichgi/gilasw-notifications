import {Expose} from "class-transformer";

export class NotificationDTO {
  @Expose()
  text!: string;

  @Expose()
  categories!: [];
}