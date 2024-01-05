const Actor = require("../models/actors");

exports.getActors = async (req, res) => {
    console.log("getting all actors");
  const actors = await Actor.find();
  res.json(actors);
}