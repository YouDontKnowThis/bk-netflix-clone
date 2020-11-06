import React, { useState, useEffect } from "react";
import axios, { base_url } from "../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

// Style
import "./Row.css";

function Row({ title, dataUrl, isLargeRow }) {
  const [movies, sertMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    // A snippet of code which runs based on a specific condition
    axios
      .get(dataUrl)
      .then((res) => {
        sertMovies(res.data.results);
      })
      .catch((err) => {
        console.log("ERROR >>> ", err.message);
      });
    // if [] , run once when the row loads, and dont ru again
    // if [prop] , run every time the (prop) updated
  }, [dataUrl]);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__container">
        {movies?.map((movie) => (
          <img
            className={`row__containerImg ${isLargeRow && "row__largeRow"}`}
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
