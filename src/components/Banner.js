import React, { useState, useEffect } from "react";
import axios, { base_url } from "../axios";
import Button from "../UI/Button";
import requests from "../request";

// Style
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    axios
      .get(requests.fetchNetflixOriginals)
      .then((res) => {
        setMovie(
          res.data.results[
            Math.floor(Math.random() * res.data.results.length - 1)
          ]
        );
      })
      .catch((err) => {
        console.log("ERROR >>>>", err.message);
      });
  }, []);

  const truncate = (str, n) => {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  };

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,.1)), url('${base_url}${movie?.backdrop_path}')`,
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__btns">
          <Button>Play</Button>
          <Button>My List</Button>
        </div>
        <p className="banner__description">{truncate(movie?.overview, 100)}</p>
      </div>
    </header>
  );
}

export default Banner;
