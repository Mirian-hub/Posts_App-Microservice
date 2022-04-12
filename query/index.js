const express = require("express");
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

const handleRequest = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { id, postId, content, status } = data;
    // console.log('comment created data:' , data)
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }

  if (type === "CommentUpdated") {
    const { id, postId, content, status } = data;
    const comment = posts[postId]?.comments?.find(
      (comment) => comment.id === id
    );
    comment.status = status;
    comment.content = content;
  }
};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleRequest(type, data);
  res.send({});
});

app.listen(4002, async () => {
  console.log("listening to  4002 (query api) ");
  const events = await axios
    .get("http://localhost:4005/events")
    .catch((err) => console.log(err));
  events.data.forEach(event => {
    console.log('Processing event', event.type)
    handleRequest(event.type, event.data)
  });
});
