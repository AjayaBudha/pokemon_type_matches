const express = require("express");
const cors = require("cors");
const app = express();

const pokemon = require("./pokemon.json");
const res = require("express/lib/response");
const req = require("express/lib/response");
const capitalise = require("./helpers/index");

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
app.post("fruits/:name", (req, res) => {
  const reqPkmType = pokemon.map((pkmTypes) => pkmTypes.name);
  let maxId = Math.max(...reqPkmType);
  const pkmType = pokemon.find((pkmType) => pkmType.name === req.body.name);

  if (pkmType !== undefined) {
    res.status(409).send({ error: "pokemon type already exists" });
  } else {
    maxId += 1;
    const newType = req.body;
    newType.id = maxId;
    pokemon.push(newType);
    console.log("done");
    res.status(201).send(newType);
  }
});

app.patch("fruits/:name", (req, res) => {
  const pkmType = pokemon.find(
    (pkmType) => pkmType.name.toLowerCase() === req.body.name.toLowerCase()
  );

  if (pkmType === undefined) {
    return res.status(404).send("Pokemon type does not exist");
  } else {
    try {
      const updatedPkmType = {
        ...req.body,
        name: capitalise(req.body.name),
        id: pkmType.id,
      };
      const idx = pokemon.findIndex((p) => p.id === pkmType.id);
      pokemon[idx] = updatedPkmType;
      res.send(updatedPkmType);
    } catch (error) {
      res.send(404).send(error.message);
    }
  }
});

//TODO: fix this
app.delete("fruits/:name", (req, res) => {
  const reqPkmType = pokemon.map((pkmTypes) => pkmTypes.name);
  const pkmType = pokemon.find((pkmType) => pkmType.name === req.body.name);

  if (pkmType === -1) {
    res.status(401).send({ error: "pokemon type does not exists" });
  } else {
    pokemon.splice(pkmType, -1);
    res.status(204).send();
  }
});

module.exports = app;
