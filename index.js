import express from "express";
const app = express();

const PORT = 4000;

function handleListening() {
  console.log(`Listening on : http://localhost:${PORT}`);
}

function handleHome(req, res) {
  console.log(req);
  res.send("hello");
}

const por = (req, res) => res.send("agrnj na fds");

app.get("/", handleHome);
app.get("/por/rrr", por);
app.listen(PORT, handleListening);
