import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original";

function Banner({ fetchUrl }) {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchMovie() {
      const response = await axios.get(fetchUrl);
      const movies = response.data.results;
      const choiceMovie = movies[Math.floor(Math.random() * movies.length) - 1];
      setMovie(choiceMovie);
    }
    fetchMovie();
  }, []);


  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${baseURL + movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
          <h1 className="banner__description">{truncate(movie?.overview, 150)}</h1>
        </div>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
