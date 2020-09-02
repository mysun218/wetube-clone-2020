import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}); //await는 async를 써야만 쓸 수 있고, 이걸 쓰면 이걸 완료 후 뒤에 가 실행된다.
    res.render("home", { pageTitle: "Home", videos }); //render함수의 첫번째 인자는 템플릿 두번째 인자는 템플릿에 추가할 정보가 담긴 객체
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
}; //import한 videos를 home화면에 전달.
export const search = (req, res) => {
  const {
    query: { term: searchingBy }, //query접근시 method=get이어야한다.url에 정보를 추가해주기 때문.
  } = req; // =const searchingBy = req.query.term;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, descriiption },
    file: { path },
  } = req; //upload and save video
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    descriiption,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });
export const editVideo = (req, res) =>
  res.render("editVideo", { pageTitle: "Edit Video" });
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });
