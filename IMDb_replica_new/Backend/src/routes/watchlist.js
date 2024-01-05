const express = require('express');
const router = express.Router();

const Movie = require('../models/movies');
const User = require('../models/user');
const { requireSignin, signoutTokenRevoke } = require('../controller/user');

router.post('/add-to-watchlist', requireSignin,  signoutTokenRevoke, async (req, res) => {
  try {
    // const { movieId } = req.body;
    const { title } = req.body;
    console.log(req.user);

    const userId = req.user._id; 
    console.log(userId);

    // const movie = await Movie.findById(movieId);
    const movie = await Movie.findOne({title: title});

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.watchlist.push(movie);
    await user.save();

    res.status(200).json({ message: 'Movie added to watchlist' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/watchlist', requireSignin, signoutTokenRevoke, async (req,res) => {
    try{
        const userId = req.user._id;
        const user = await User.findById(userId).populate('watchlist');

        if(!user){
            res.status(400).json({ message: 'user not found'});
        }

        res.status(200).send(user.watchlist);

    }catch(err){
        console.log(err);
        res.status(500).json({message: "something went wrong"});
    }
});

router.delete('/remove-from-watchlist', requireSignin, signoutTokenRevoke, async (req, res) => {
    try{

        const {movieId} = req.body;
        const userId = req.user._id;

        const user = await User.findById(userId);

        if(!user){
            res.status(400).json({message: 'user not found'});
        };

        if(!user.watchlist.includes(movieId)){
            res.status(400).json({message: 'Movie not found'});
        };

        user.watchlist.pull(movieId);
        await user.save();

        res.status(200).json({message: 'Movie removed successfully '});

    }catch(err){
        console.log(err);
        res.status(500).json({message: "something went wrong"});
    }
})

module.exports = router;