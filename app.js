import express from "express"; //const express = require("express")랑 같음.
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser"; //import바로 뒤의 명칭은 바꿔도 무관 from뒤만 쓰고 싶은 middleware명칭 넣으면 됨.
import { localsMiddleware } from "./middlewares";
import userRouter from "./routers/userRouter"; //default로 export안했기에 {}들어감.
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";
import routes from "./routes";

const app = express();

app.use(helmet());
app.set("view engine", "pug"); //pug설치 후 이걸 적어야함.
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(localsMiddleware);
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter); //app.use사용은 누군가 user의 경로로 간다면 이 router전체를 사용하겠다는 의미.
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 불러올 떄(import) app object를 주겠다.
