import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Row.css";
import { Pagination } from "./Pagination";
import { DetailModal } from "./DetailModal";




const base_url = "https://image.tmdb.org/t/p/original";

export const AllMovies = () => {
    const [counter, setCounter] = useState(0);
    const [clickedMovie, setClickedMovie] = useState({});
    const [isModalOpen , setModalState] = useState(false);
   
    const [movieData, setMovieData] = useState({
        movieList: [],
        currentPage: 1,
        totalPages: 0,
    });
    useEffect(() => {
        console.log("inside useEffect currentP", movieData.currentPage);
        axios
            .get(
                `https://api.themoviedb.org/3/discover/movie?api_key=7f5818df9df5b63b9d68dbd47b4f79fa&language=en-US&sort_by=popularity.desc&page=${movieData.currentPage}`
            )
            .then((response) => {
                setMovieData({
                    movieList: response.data.results,
                    currentPage: response.data.page,
                    totalPages: response.data.total_pages,
                });
            })
            .catch((err) => console.log(err));
    }, [movieData.currentPage]);

    const handleCounter = (value) => {
        setCounter((prev) => prev + value);
    };

    const handleOnPageChange = (value) => {
        setMovieData({
            currentPage: value,
        });
    };
    const handleImageClick = (movie) => {
        console.log('inside allmovies click',movie)
        setClickedMovie(movie);
        setModalState(true);
    }
    const handleClose =() =>{
        setModalState(false);
    }
    return (
        <div>
            <h2 style={{ color: "black", textAlign: "left", marginLeft: "40px" }}>
                All Movies
            </h2>
            <div className="row row-cols-2 row-cols-md-5 g-4">
                {movieData.movieList && movieData.movieList.length > 0
                    ? movieData.movieList.map((movie, index) => {
                        return (
                            <div key={index} className="col">
                                <div className="card h-100" style={{ border: "none" }} >
                                    <img
                                        key={movie.id}
                                        className="card-img-top"
                                        src={`${base_url}${movie.poster_path}`}
                                        alt={movie.name}
                                        style={{ height: "15vw" }}
                                      
                                        onClick={() => handleImageClick(movie)}
                                    />
                                    <div className="card-body" style={{ color: "black" }} >
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text"><i className="fa-solid fa-star" style={{ color: "sandybrown" }}><span style={{ color: "black" }}> {movie.vote_average}</span></i></p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : null}
            </div>
     {
            isModalOpen ? <DetailModal clickedMovie={clickedMovie} handleModalState={handleClose}/> : null
     }

        
            <div style={{ marginTop: "20px" }} >
                {movieData.totalPages > 0 ? (
                    <Pagination
                        onPageChange={handleOnPageChange}
                        totalPages={movieData.totalPages}
                        currentPage={movieData.currentPage}
                        handleCounter={handleCounter}
                        counter={counter}
                    />
                ) : null}
            </div>
        </div>
    );
};
