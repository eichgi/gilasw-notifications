import {SendNotification} from "./sendNotification.class";
import {iNotification} from "./Notification";

const logger = require('./../logger');

export class EmailNotification extends SendNotification {
  constructor(notification: iNotification) {
    super(notification);
  }

  async send(): Promise<{ success: boolean, errors: string[] }> {
    super.send();
    try {
      //throw new Error('FAIL'); // for catching errors
      const {name} = this.notification.user;
      const category = this.notification.user.subscribedCategories.toString().toLowerCase();
      const {text} = this.notification;
      await logger.info(`Email notification to ${name} under category ${category}: ${text}`);
      return {success: true, errors: []};
    } catch (error) {
      return {success: false, errors: ["Notification failed"]}
    }
  }
}