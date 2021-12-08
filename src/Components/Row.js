import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import { useNavigate } from 'react-router-dom';

const base_url = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [count, setCount] = useState(0);
  const moviePerRow = 7;
  let startIndex = 1 + moviePerRow * count;
  let endIndex = moviePerRow + moviePerRow * count;

  useEffect(() => {
    axios.get(`${fetchUrl}&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        setPage(response.data.page);
      }).catch((err) => console.log(err))

  }, [page]);

  const handleClick = (movie) => {
    if (movie !== undefined) {
      navigate(`/movieDetail?movieId=${movie.id}&movieType=${title}`, { state: { clickedMovie: movie } })
    }
    else alert('Movie details not found');
  };

  const handleCount = (e) => {
    if (e.target.name == '1') {
      if (e.target.value == 2) {
        setCount(0);
        setPage((prev) => prev + 1);
      }
      else {
        setCount((prev) => prev + 1);
      }
    }
    else if (e.target.name == '-1') {
      if (e.target.value == 0) {
        setCount(2);
        setPage((prev) => prev - 1);
      }
      else {
        setCount((prev) => prev - 1);
      }
    }
  }

  return (
    <div className="row" style={{ height: "400px" }} >
      <div style={{ marginTop: "10px" }} >
        <h2 style={{ display: "inline-block", color: "black" }} > {title} </h2>
        <button className='btn' name='1' value={count} onClick={(e) => handleCount(e)} style={{ backgroundColor: "white", border: "none", color: "blue", float: "right", marginRight: "10px", fontSize: "1.5rem", width: "74px", height: "49px" }} >Next</button>
        <button className={`"btn ${page == 1 && count == 0 ? "btn disabled" : null}`} name='-1' value={count} onClick={(e) => handleCount(e)} style={{ backgroundColor: "white", border: "none", color: "blue", float: "right", marginRight: "20px", fontSize: "1.5rem", width: "74px", height: "49px" }} >Prev</button>
      </div>
      <div className="row_posters" >
        {movies.slice(startIndex, endIndex + 1).map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="row_poster"
            src={`${movie.poster_path !== undefined || null ? `${base_url}${movie.poster_path}` : "Assets/no_image_found.jpg"}`}

          />
        ))}
      </div>
    </div>
  );
};
export default Row;
