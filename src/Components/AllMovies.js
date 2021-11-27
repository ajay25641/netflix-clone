import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./Row.css";
import { Pagination } from "./Pagination";

const base_url = "https://image.tmdb.org/t/p/original";

export const AllMovies = () => {
    const [counter, setCounter] = useState(0);
    const [clickedMovie, setClickedMovie] = useState({});
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
        setClickedMovie(movie);
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
                            <div className="col">
                                <div key={index} className="card h-100" style={{ border: "none" }} >
                                    <img
                                        key={movie.id}
                                        className="card-img-top"
                                        src={`${base_url}${movie.poster_path}`}
                                        alt={movie.name}
                                        style={{ height: "15vw" }}
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
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
            <div id="exampleModal" className="modal">
                <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="card h-100" style={{ maxWidth: "100%", border: "none" }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img
                                            style={{ height: "40vw" }}
                                            className="img-fluid rounded-start"
                                            src={`${base_url}${clickedMovie.poster_path}`}
                                            alt={clickedMovie.name}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body" style={{ color: "black" }} >
                                            <h2 className="card-title">{clickedMovie.title}</h2>
                                            <h5>Overview</h5>
                                            <p className="card-text">{clickedMovie.overview}</p>
                                            <p className="card-text"><small className="text-muted">Release Date {clickedMovie.release_date}</small></p>
                                            <p className="card-text"><i className="fa-solid fa-star" style={{ color: "sandybrown" }}><span style={{ color: "black" }}> {clickedMovie.vote_average}</span></i></p>
                                            <p className="card-text"><button className="btn btn-primary" style={{ width: "100%", height: "50px", color: "white", fontSize: "25px", fontWeight: "bolder", fontfamily: "-webkit-body" }} >Play Trailer</button></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
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
