import {Request, Response} from "express";
import {readLogsFile, sendNotificationToUsers} from "../services/notifications";
import {plainToInstance} from "class-transformer";
import {NotificationDTO} from "../dto/notification.dto";
import {LogDto} from "../dto/log.dto";

export const newNotification = async (req: Request, res: Response) => {
  try {
    //This could also be done inside a middleware
    const notificationDto = plainToInstance(NotificationDTO, req.body, {excludeExtraneousValues: true});

    setTimeout(async () => {
      const response = await sendNotificationToUsers(notificationDto);
      res.json({message: "The notifications has been sent!"});
    }, 2000);
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "An error has occurred."});
  }
};

export const getNotifications = async (req: Response, res: Response) => {
  try {
    const logs: LogDto[] = await readLogsFile();

    res.json({message: "logs...", logs});
  } catch (error) {
    res.status(500).json({message: "An error has occurred."});
  }
}