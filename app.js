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

//find specific type
app.get("/types/:name", (req, res) => {
  const reqPkmType = req.params.name.toLowerCase();
  const pkmType = pokemon.find(
    (pkmType) => pkmType.name.toLowerCase() === reqPkmType
  );
  if (pkmType === undefined) {
    res.status(404).send({ error: `pokemon type: ${reqPkmType} not found` });
  }
  res.send(pkmType);
});

//add new type
app.post("fruits/", (req, res) => {
  const reqPkmType = pokemon.map((pkmTypes) => pkmTypes.name);
  let maxId = Math.max(...reqPkmType);
  const pkmType = pokemon.find((pkmType) => pkmType.name === req.body.name);

  if (pkmType !== undefined) {
    res.status(409).send({ error: "pokemon type alreay exists" });
  } else {
    maxId += 1;
    const newType = req.body;
    newType.id = maxId;
    pokemon.push(newType);
    res.status(201).send(newType);
  }
});

module.exports = app;
