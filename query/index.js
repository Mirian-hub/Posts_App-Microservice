const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
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
  console.log("posts :", posts);
  res.send({});
});

app.listen(4002, () => {
  console.log("listening to  4002 (query api) ");
});
