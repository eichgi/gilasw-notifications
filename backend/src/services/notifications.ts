import {SMSNotification} from "../definitions/smsNotification.class";
import {users} from "../mocks/users";
import {eCategory, eChannel} from "../definitions/Notification";
import {iUser} from "../definitions/User";
import {EmailNotification} from "../definitions/emailNotification.class";
import {PushNotification} from "../definitions/pushNotification.class";
import {NotificationDTO} from "../dto/notification.dto";
import {plainToInstance} from "class-transformer";
import {LogDto} from "../dto/log.dto";

export const sendNotificationToUsers = async (notificationDto: NotificationDTO) => {
  const {text, categories} = notificationDto;
  const allNotifications = [];
  try {

    for (let category of categories) {
      const matchedUsersByCategory = getUsersByCategory(category);

      for (const user of matchedUsersByCategory) {
        if (user.subscribedChannels.includes(eChannel.PUSH)) {
          allNotifications.push(new PushNotification({text, user}).send());
        }

        if (user.subscribedChannels.includes(eChannel.EMAIL)) {
          allNotifications.push(new EmailNotification({text, user}).send());
        }

        if (user.subscribedChannels.includes(eChannel.SMS)) {
          allNotifications.push(new SMSNotification({text, user}).send());
        }
      }
    }

    await Promise.all(allNotifications);
  } catch (error) {
    console.log("ERROR ", error);
  }

  return true;
}

const getUsersByCategory = (category: eCategory): iUser[] => {
  return users.filter(user => user.subscribedCategories.includes(category));
}

export const readLogsFile = async (): Promise<LogDto[]> => {
  const fs = require("fs");
  try {
    const data = await fs.promises.readFile(__dirname + "/../notifications.log", "utf8");

    const logs = data
      .split('\n')
      .filter((line: string) => line)
      .map((line: string) => {
        if (line) {
          return JSON.parse(line);
        }
      })
      .map((line: object) => {
        return plainToInstance(LogDto, line, {excludeExtraneousValues: true});
      });
    return logs;
  } catch (error) {
    console.log("Logging an error when reading logs, lol", error);
    return [];
  }
}