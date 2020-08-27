import routes from "./routes";

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube"; //locals에 siteName추가.  locals에 로컬 변수를 저장하면 이 변수를 템플릿에서 사용 가능.
  res.locals.routes = routes; //이렇게 하면 partials header에서 #대신에 routes를 쓸수 있다.
  next(); //다음 함수로 넘어간다는 뜻.
};
