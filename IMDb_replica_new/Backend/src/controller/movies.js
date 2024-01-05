const Movie = require("../models/movies");

exports.getMovies = async (req, res) => {
    console.log("getting all movies");
  const movies = await Movie.find();
  res.json(movies);
}