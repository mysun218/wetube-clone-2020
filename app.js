import express from "express"; //const express = require("express")랑 같음.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; //import바로 뒤의 명칭은 바꿔도 무관 from뒤만 쓰고 싶은 middleware명칭 넣으면 됨.
import passport from "passport";
import mongoose from "mongoose";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter"; //default로 export안했기에 {}들어감.
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

import "./passport";

const app = express();

const CokieStore = MongoStore(session);

app.use(helmet());
app.set("view engine", "pug"); //pug설치 후 이걸 적어야함.
app.use("/uploads", express.static("uploads")); //directory에서 file을 보내주는 middleware 여기서는 현재 video파일들을 보내줌. 이 일을 나중에는 amazon에서 하게 될것.
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: new CokieStore({ mongooseConnection: mongoose.connection })
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); //app.use사용은 누군가 user의 경로로 간다면 이 router전체를 사용하겠다는 의미.
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 불러올 떄(import) app object를 주겠다.
