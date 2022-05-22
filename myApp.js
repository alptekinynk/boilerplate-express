let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function(req, res) {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === "uppercase") {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});




























module.exports = app;
