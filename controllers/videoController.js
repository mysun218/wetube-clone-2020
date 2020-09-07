import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //await는 async를 써야만 쓸 수 있고, 이걸 쓰면 이걸 완료 후 뒤에 가 실행된다.
    res.render("home", { pageTitle: "Home", videos }); //render함수의 첫번째 인자는 템플릿 두번째 인자는 템플릿에 추가할 정보가 담긴 객체
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
}; //import한 videos를 home화면에 전달.
export const search = async (req, res) => {
  const {
    query: { term: searchingBy }, //query접근시 method=get이어야한다.url에 정보를 추가해주기 때문.
  } = req; // =const searchingBy = req.query.term;
  let videos = [];
  try {
    videos = await Video.find({ title: { $regex: searchingBy, $options: "i" } });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};
export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req; //upload and save video
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
  });
  res.redirect(routes.videoDetail(newVideo.id));
};
export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};
