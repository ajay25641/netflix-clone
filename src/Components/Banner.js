import React, { useState, useEffect } from "react";
import axios from "../axios";
import requests from "../request";
import "./banner.css";
const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        res.data.results[
        Math.floor(Math.random() * res.data.results.length - 1)
        ]
      );
    };
    fetchData();
  }, []);
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  return (
    <div class="card h-50">
      <img src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} class="card-img" style={{ height: "500px" }} alt="..." />
      <div class="card-img-overlay" style={{ top: "230px" }}>
        <h1 class="card-title banner_title ">{movie?.title || movie?.name || movie?.original_name}</h1>
        <p class="card-text"> <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1></p>
        <p class="card-text"></p>
        <div className="banner_buttons">
          <button className="banner_button" >Play</button>
          <button className="banner_button">My List</button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
