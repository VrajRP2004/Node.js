const express = require('express')
const moviesController = require('./../Controllers/moviesController')

//ep 108
const authController = require('./../Controllers/authController')

const router = express.Router()

// ep 80
router.route('/highest-rated').get(moviesController.getHighestRated,moviesController.getAllMovies)

router.route('/movies-stats').get(moviesController.getMovieStats)

router.route('/movies-by-genre/:genre').get(moviesController.getMoviesByGenre)

// router.param('id',moviesController.checkId)

router.route('/')
.get(authController.protect,moviesController.getAllMovies)
.post(moviesController.createMovie)

router.route("/:id")
.get(moviesController.getMovie)
.patch(moviesController.updateMovie)
.delete(moviesController.deleteMovie)

module.exports = router;
// app.use('/api/v1/movies',Router)