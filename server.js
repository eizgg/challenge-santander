require("dotenv").config();
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const port = process.env.port || 8080;
const path = require("path");
var request = require("retry-request", {
  request: require("request"),
});
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(port, () => console.log(`server started on port${port}`));
var Cloudant = require("@cloudant/cloudant");
var temperatura = 0;

/////////REACT APPLICATION //////////
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("*", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "/client/build/") });
});

// Initialize Cloudant with settings from .env
var username = process.env.cloudant_username;
var password = process.env.cloudant_password;
//conexión con retry y maxAttempt definidos 
var cloudant = Cloudant({
  account: username,
  password: password,
  maxAttempt: 5,
  plugins: { retry: { retryDelayMultiplier: 4 } },
});
var db = cloudant.db.use("users");
app.post("/api/users", (req, res) => {
  var user = req.body.user;
  var pw = req.body.password;
  console.log(req.body);
  let query = "user:" + user + " AND password:" + pw;
  db.search("usersIndex", "searchUsers", { q: query }, function (err, result) {
    if (err) {
      throw err;
    }
    if (result.rows.length > 0) {
      console.log("entro hay pw");
      res.send({ acceso: true });
    } else {
      res.send({ acceso: false });
    }
  });
});
//Calculo de las cervezas que habría que comprar
app.post("/api/cervezas", (req, res) => {
  console.log(req.body);
  var CajaDeCervezas = 0;
  var personas = req.body.personas;
  if (temperatura >= 20 && temperatura < 24) {
    CajaDeCervezas = Math.ceil(personas / 6);
  } else if (temperatura < 20) {
    CajaDeCervezas = Math.ceil((0.75 * personas) / 6);
  } else if (temperatura > 24) {
    CajaDeCervezas = Math.ceil((3 * personas) / 6);
  }
  res.send({ PacksDeCervezas: CajaDeCervezas });
});
//Conexión a la api del clima.
app.post("/api/weather", (req, res) => {
  var options = {
    noResponseRetries: 3,
    method: "GET",
    url: "https://community-open-weather-map.p.rapidapi.com/weather",
    qs: { units: "metric", q: "Retiro" },
    headers: {
      "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
      "x-rapidapi-key": "17722df541mshafbf17062e05331p1efad8jsnb7f3fe5d6f74",
      useQueryString: true,
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    parse = JSON.parse(body);
    temperatura = Math.round(parse.main.temp);
    res.send(body);
  });
});
