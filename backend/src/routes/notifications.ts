import {getNotifications, newNotification} from "../controllers/notifications";
import schemaValidator from "../validators/schemaValidatorMiddleware";

const express = require('express');

export const notificationsRouter = express.Router();

notificationsRouter.get('/', getNotifications);
notificationsRouter.post('/new', schemaValidator("newNotification"), newNotification);