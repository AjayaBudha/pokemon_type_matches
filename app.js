const express = require("express");
const cors = require("cors");
const app = express();

const pokemon = require("./pokemon.json");
const res = require("express/lib/response");
const req = require("express/lib/response");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello pokemon fans!");
});

//show the json file
app.get("/types", (req, res) => {
  res.send(pokemon);
});

//just to display the id
// app.get("/types/:id", (req, res) => {
//   res.send(req.params.id);
// });

//find specific type
app.get("/types/:id", (req, res) => {
  const pkmID = req.params.id;
  const id = "id";
  console.log(pokemon["id"]);
  const findPKM = pokemon.find((findPKM) => findPKM.id === pkmID);

  if (findPKM === undefined) {
    res.status(404).send({ error: `pokemon id: ${pkmID} not found` });
  }
  res.send(findPKM);
});
module.exports = app;
