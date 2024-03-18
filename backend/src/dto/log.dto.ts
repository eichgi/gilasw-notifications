import {Exclude, Expose} from "class-transformer";

export class LogDto {
  @Exclude()
  level!: number;

  @Exclude()
  pid!: number;

  @Exclude()
  hostname!: number;

  @Expose()
  time!: number;

  @Expose()
  msg!: string;
}