const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String, // Correct usage of type
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Action",
          "Drama",
          "Comedy",
          "Romance",
          "Thriller",
          "Fantasy",
          "Sci-Fi",
          "Horror",
          "Sports",
          "Musical",
          "Other",
        ],
      },
    ],
    director: {
      type: String,
      required: true,
    },
    actors: [
      {
        type: String,
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "India",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    plot: {
      type: String,
    },
    awards: {
      type: String,
    },
    posterUrl: {
      type: String,
    },
    trailerUrl: {
      type: String,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: true }, // Auto-generates createdAt and updatedAt
  }
);

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie; // Corrected export statement
