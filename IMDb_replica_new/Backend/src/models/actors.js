const mongoose = require('mongoose');

const actorSchema = new mongoose.Schema({
    name: String,
    rating: Number,
    alternative_name: String
  });
  
module.exports = mongoose.model('Actor', actorSchema);