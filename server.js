const express = require("express");
const app = express();
const port = 5000;
const path = require("path");
const request = require("request");
app.listen(port, () => console.log(`server started on port${port}`));

app.post("/api/cervezas", (req, res) => {
  var CajaDeCervezas=0;
  var personas = req.body.personas;
  var temperatura = req.body.temperatura;
  if (temperatura >= 20 && temperatura < 24) {
    CajaDeCervezas = Math.ceil(personas / 6);
  } else if (temperatura < 20) {
 CajaDeCervezas = Math.ceil( (0.75*personas)/6 )
  } else if (temperatura>24){
    CajaDeCervezas = Math.ceil( (3*personas)/6 )
  }
  res.send(CajaDeCervezas);
});

app.post("/api/weather", (req, res) => {
  var options = {
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

    res.send(body);
  });
});

/////////REACT APPLICATION //////////
app.use(express.static(path.join(__dirname, "/client/build")));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: path.join(__dirname, "/client/build/") });
});
