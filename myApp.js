let express = require('express');
let app = express();
const bodyParser = require("body-parser");
  
console.log("Hello World");

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false}));

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

app.get("/name", (req, res) =>{
  var firstname = req.query.first;
  var lastname = req.query.last;

  res.json({
    name: firstname + " " + lastname
  });
});


app.post("/name", bodyParser.urlencoded({ extended: false}),(req, res) => {
          var string = req.body.first + " " + req.body.last;
          console.log(string);
          res.json({name: string});
         });
















module.exports = app;
