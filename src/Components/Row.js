import React, { useState, useEffect } from "react";
import axios from "../axios";
import "./Row.css";
import { DetailModal } from "./DetailModal";


const base_url = "https://image.tmdb.org/t/p/original";

export const Row = ({ title, fetchUrl }) => {
  const [page,setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [clickedMovie, setClickedMovie] = useState({});
  const [isModalOpen, setModalState] = useState(false);
  const [more , setMore] = useState(0);
  const moviePerRow = 7;
  let startIndex = 1 + moviePerRow * more;
  let endIndex = moviePerRow + moviePerRow * more;

  useEffect(() => {
    axios.get(`${fetchUrl}&page=${page}`)
     .then((response)=>{
      setMovies(response.data.results);
      setPage(response.data.page);
     }).catch((err)=>console.log(err))
     
  },[page]);

  const handleClick = (movie) => {
    setClickedMovie(movie);
    setModalState(true);
  };
  const handleClose = () => {
    setModalState(false);
  }
  const handleMore=(e)=>{
  if(e.target.value==2){
    setMore(0);
    setPage((prev)=>prev+1);
    }
  else{
    setMore((prev)=>prev+1);
  }
  }   

  return (
    <div className="row" style={{height:"400px"}} >
      <div style={{marginTop:"10px"}} >
        <h2 style={{display:"inline-block", color:"black" }} > {title} </h2>
        <button value={more} onClick={(e)=>handleMore(e)} style={{backgroundColor:"white" , border:"none" , color:"blue" , float:"right" , marginRight:"10px" , fontSize:"1.5rem" }} >more</button>
      </div>
      <div className="row_posters" >
        {movies.slice(startIndex, endIndex + 1).map((movie) => (
          <img
            key={movie.id}
            data-bs-toggle="modal" data-bs-target="#exampleModal"
            onClick={() => handleClick(movie)}
            className="row_poster"
            src={`${base_url}${movie.poster_path
              }`}
            alt={movie.name}
          />
        ))}
      </div>
      {
        isModalOpen ? <DetailModal clickedMovie={clickedMovie} handleModalState={handleClose} /> : null
      }
    </div>
  );
};
export default Row;
