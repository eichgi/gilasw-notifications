import {SendNotification} from "./sendNotification.class";
import {iNotification} from "./Notification";

const logger = require('./../logger');

export class SMSNotification extends SendNotification {
  constructor(notification: iNotification) {
    super(notification);
  }

  async send(): Promise<{ success: boolean, errors: string[] }> {
    super.send();
    try {
      const {name} = this.notification.user;
      const category = this.notification.user.subscribedCategories.toString().toLowerCase();
      const {text} = this.notification;
      await logger.info(`SMS notification to ${name} under category ${category}: ${text}`);
      return {success: true, errors: []};
    } catch (error) {
      return {success: false, errors: ["Notification failed"]}
    }
  }
}