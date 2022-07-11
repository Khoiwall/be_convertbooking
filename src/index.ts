import express, { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import fetch from "node-fetch";
dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 3002;

app.use(cors());
//connectDB
const DB = require("./config/db/index");
DB.connectDB(process.env.USER_MONGO, process.env.PASSWORD_MONGO);

//Midellware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
//api
import userApi from "./routes/v1/user.route";
import businessApi from "./routes/v1/business.route";
import videoApi from "./routes/v1/video.route";
import customerApi from "./routes/v1/customer.route";
app.use("/api/user", userApi);
app.use("/api/business", businessApi);
app.use("/api/video", videoApi);
app.use("/api/customer", customerApi);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

//recording
const API_KEY = process.env.DAILY_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = (room: string) => {
  return fetch(`https://api.daily.co/v1/rooms/${room}`, {
    method: "GET",
    headers,
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.error("error:" + err));
};

const createRoom = (room: string) => {
  return fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers,
    body: JSON.stringify({
      name: room,
      properties: {
        enable_screenshare: true,
        enable_chat: true,
        start_video_off: true,
        start_audio_off: false,
        lang: "en",
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => {
      return json;
    })
    .catch((err) => console.log("error:" + err));
};

app.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
