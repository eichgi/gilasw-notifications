import {Deliverables, iNotification} from "./Notification";

export abstract class SendNotification implements Deliverables {

  public notification: iNotification;
  constructor(notification: iNotification) {
    this.notification = notification;
  }

  send():void {}
}