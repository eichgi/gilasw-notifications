import express, { Express } from "express";
import dotenv from "dotenv";
const cors = require("cors");

import { notificationsRouter } from "./routes/notifications";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use('/notifications', notificationsRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});