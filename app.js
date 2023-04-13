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
app.get("/types/:name", (req, res) => {
  const pkmName = req.params.name.toLowerCase();
  const pkmType = pokemon.find(
    (pkmType) => pkmType.name.toLowerCase() === pkmName
  );
  if (pkmType === undefined) {
    res.status(404).send({ error: `pokemon id: ${pkmID} not found` });
  }
  res.send(pkmType);
});
module.exports = app;
