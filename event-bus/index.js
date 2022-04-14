const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();

const events = [];
app.use(bodyparser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  console.log('event type: ', event)
  events.push(event)
  await axios.post("http://posts-clusterip-srv:4000/events", event).catch((err) => {
    console.log(err.message);
  });
  await axios.post("http://comments-srv:4001/events", event).catch((err) => {
    console.log(err.message);
  });
  await axios.post("http://query-srv:4002/events", event).catch((err) => {
    console.log(err.message);
  });
  await axios.post("http://moderate-srv:4003/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "ok" });
});

app.get("/events", (req,res)=> {
  res.send(events)
})

app.listen(4005, () => {
  console.log("istening to port 4005 (event-bus)");
});
