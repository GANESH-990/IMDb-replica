const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors'); 
env.config();

const app = express();
const port = process.env.PORT || 8080;

const moviesRoute = require("./routes/movies");
const actorsRoute = require("./routes/actors");
const usersRoute = require("./routes/user");
const watchlistRoute = require('./routes/watchlist');

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster1.9zh46aw.mongodb.net/?retryWrites=true&w=majority`, 
  {
      useNewUrlParser:true , 
      useUnifiedTopology:true,
  }
).then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => console.error('Error connecting to MongoDB:', err));

app.use(express.json());
app.use(cors());

app.use('/api', moviesRoute);
app.use('/api', actorsRoute);
app.use('/api', usersRoute);
app.use('/api', watchlistRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});