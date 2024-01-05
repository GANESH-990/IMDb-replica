const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv');
const cors = require('cors'); 
const path = require("path");
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

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    );
  } else {
    app.get("/", (req, res) => {
      res.send("API is running");
    });
  }

app.use('/api', moviesRoute);
app.use('/api', actorsRoute);
app.use('/api', usersRoute);
app.use('/api', watchlistRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});