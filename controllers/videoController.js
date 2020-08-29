import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) => {
  res.render("home", { pageTitle: "Home", videos }); //render함수의 첫번째 인자는 템플릿 두번째 인자는 템플릿에 추가할 정보가 담긴 객체
}; //import한 videos를 home화면에 전달.
export const search = (req, res) => {
  const {
    query: { term: searchingBy }, //query접근시 method=get이어야한다.url에 정보를 추가해주기 때문.
  } = req; // =const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = (req, res) => {
  const {
    body: { file, title, descriiption },
  } = req; //upload and save video
  res.redirect(routes.videoDetail(32145));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
