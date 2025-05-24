const express = require("express");
const app = express();
app.use(express.json());

const { initializeDatabase } = require("./db/db.connect");
const Movie = require("./models/movie.models");

initializeDatabase();
// create movie!!

const newMOvie = {
  title: "New Movie",
  releaseYear: 2025,
  genre: ["Action"],
  director: "S. S. Rajamouli",
  actors: ["Actor 1", "Actor 2"],
  language: "Hindi",
  country: "India",
  rating: 8.1,
  plot: "A man embarks on a journey .",
  awards: "ABC Film Award",
  posterUrl: "https://example.com/new-poster2.jpg",
  trailerUrl: "https://example.com/new-trailer2.mp4",
};

async function createMovie(newMovie) {
  try {
    const movie = new Movie(newMovie);
    const saveMovie = await movie.save();
    return saveMovie;
  } catch (error) {
    throw error;
  }
}

app.post("/movies", async (req, res) => {
  try {
    const savedMovie = await createMovie(req.body);
    res
      .status(201)
      .json({ message: "Movie added succussfully.", movie: savedMovie });
  } catch (error) {
    res.status(500).json({ error: "Failed to Add movie." });
  }
});

//createMovie(newMOvie);

//find a movie with particular  title

async function readMovieByTitle(movieTitle) {
  try {
    const movie = await Movie.findOne({ title: movieTitle });
    return movie;
  } catch (error) {
    throw error;
  }
}

//readMovieByTitle("Kabhi Khushi Kabhie Gham");

app.get("/movies/:title", async (req, res) => {
  try {
    const movie = await readMovieByTitle(req.params.title);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

//get all the movies in the database.

async function readAllMovies() {
  try {
    const allmovie = await Movie.find();
    return allmovie;
  } catch (error) {
    throw error;
  }
}

app.get("/movies", async (req, res) => {
  try {
    const movies = await readAllMovies();
    if (movies.length != 0) {
      res.send(movies);
    } else {
      res.status(404).json({ error: "No Movie found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

// read all movie by director

async function readMovieByDirector(movieDir) {
  try {
    const movie = await Movie.find({ director: movieDir });
    return movie;
  } catch (error) {
    throw error;
  }
}

app.get("/movies/director/:dirName", async (req, res) => {
  try {
    const movies = await readMovieByDirector(req.params.dirName);
    if (movies.length != 0) {
      res.send(movies);
    } else {
      res.status(404).json({ error: "No Movie found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

// read all movie by genre in db

async function readMovieByGenre(movieGenre) {
  try {
    const movie = await Movie.find({ genre: movieGenre });
    return movie;
  } catch (error) {
    throw error;
  }
}

app.get("/movies/genres/:genreName", async (req, res) => {
  try {
    const movies = await readMovieByGenre(req.params.genreName);
    if (movies.length != 0) {
      res.json(movies);
    } else {
      res.status(404).json({ error: "No Movie found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie." });
  }
});

//readAllMovies By language.

async function readMovieByLanguage(movieLang) {
  try {
    const movie = await Movie.find({ language: movieLang });
    console.log(movie);
  } catch (error) {
    throw error;
  }
}

//readMovieByLanguage("Telugu")

//----

//find movie By id and update

async function updateMovieById(movieId, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, dataToUpdate, {
      new: true,
    });
    return updatedMovie;
  } catch (error) {
    console.log("error  in changing data:", error);
  }
}

app.post("/movies/:movieId", async (req, res) => {
  try {
    const updatedMovie = await updateMovieById(req.params.movieId, req.body);
    if (updatedMovie) {
      res.status(200).json({
        message: "movie  updated succussfully.",
        updatedMovie: updatedMovie,
      });
    } else {
      res.status(404).json({ error: "Movie not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update movie." });
  }
});

//updateMovie("68248a678678a12a3e5afffa", { releaseYear: 2002 });

//find one data and update value

async function updateMovieDetail(movieTitle, dataToUpdate) {
  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { title: movieTitle },
      dataToUpdate,
      {
        new: true,
      }
    );
    console.log(updatedMovie);
  } catch (error) {
    console.log("error  in changing data:", error);
  }
}

//updateMovieDetail("Kabhi Khushi Kabhie Gham", { releaseYear: 2001 });

//find movie By id and delete from database

async function deleteMovie(movieId) {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    return deletedMovie;
  } catch (error) {
    console.log("Error in deleting movie", error);
  }
}

app.delete("/movies/:movieId", async (req, res) => {
  try {
    const deletedMovie = await deleteMovie(req.params.movieId);
    if (deletedMovie) {
      res.status(200).json({ message: "movie  deleted succussfully." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete movie." });
  }
});
//deleteMovie("6825a1d3e9077dc688e9e14e");

//find movie By one and delete from database

async function deleteMovieByTitle(movieTitle) {
  try {
    const deletedMovie = await Movie.findOneAndDelete({ title: movieTitle });
    console.log("This movie  was deleted ", deletedMovie);
  } catch (error) {
    console.log("Error in deleting movie", error);
  }
}
//deleteMovieByTitle("Lagaan");

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
