import * as joi from 'joi';
import {ObjectSchema} from "joi";
import {eCategory} from "../definitions/Notification";

const getEnumValues = <T extends string>(e: any): T[] =>
  typeof e === "object" ? Object.keys(e).map((key) => e[key]): [];

const newNotificationSchema = joi.object({
  text: joi.string().required(),
  categories: joi.array().items(joi.string().valid(...getEnumValues(eCategory)).required())
});

export default {
  "newNotification": newNotificationSchema
} as { [key: string]: ObjectSchema };