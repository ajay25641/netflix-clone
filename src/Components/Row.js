import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original";
export const Row = ({ title, fetchUrl}) => {
  console.log('title' , title);
  console.log('fetch url',fetchUrl)
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      setMovies(response.data.results);
    }
    fetchData();
    console.log(movies);
  }, [fetchUrl]);
  const opts = {
    height: "390px",
    width: "100%",
    playerVars: {
      autoPlay: 1,
    },
  };
  const handleClick = (movie) => {
    console.log("inside handleClick");
    console.log(movie.name);
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(
        movie?.name || movie?.original_name || movie?.title || movie?.id || " "
      )
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log(urlParams);
          setTrailerUrl(urlParams.get("v"));
          console.log(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div className="row">
      <h2 style={{color:"black"}} > {title} </h2>
      <div className="row_posters" >
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="row_poster"
            src={`${base_url}${
             movie.poster_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};
export default Row;
