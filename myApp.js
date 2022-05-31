let express = require('express');
let app = express();

console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));

//root lvl middleware
app.use((request, res, next) =>{
  console.log(request.method + ' ' + request.path + ' - ' + request.ip);
  next();
});

//simple get request
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

//.env usage
app.get("/json", function(req, res) {
  const mySecret = process.env['MESSAGE_STYLE'];
  if (mySecret === "uppercase") {
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});
//comment
app.get(
  "/now", 
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.send({
      time: req.time
    });
  }
);

app.get("/:word/echo", (req, res)=>{
  const { word } = req.params;
  res.json({
    "echo": word 
  });
});























module.exports = app;
