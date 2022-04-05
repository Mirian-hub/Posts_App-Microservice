const express = require("express");
const cores = require("cores");
const bodyParser = require("body-parser");

const app = express();
app.use(cores());
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
   
  if(type === "CommentCreated") {
    const {id, postId, content} = data
    const post = posts[postId]
    post.comments.push({id, content})
  }

  res.send({})

});

app.listen(4002, () => {
  console.log("listening to 4002");
});
