import React from 'react'
import { useState, useEffect } from 'react';
import requests from '../request';
import { Pagination } from "./Pagination";
import { useNavigate } from 'react-router-dom';
import axios from "../axios";



const base_url = "https://image.tmdb.org/t/p/original";

const SearchBar = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [param, setParam] = useState('');
    const [optionValue, setOptionValue] = useState('0');
    const [counter, setCounter] = useState(0);
    const [movieData, setMovieData] = useState({
        movieList: [],
        currentPage: 1,
        totalPages: 1,
    });
    useEffect(() => {
        if (optionValue == 0) {
            axios.get(`${requests.searchMovie}&page=${movieData.currentPage}${param.length > 0 ? `&query=${param}` : null}`)
                .then((response) => {
                    if (!response.data.errors) {
                        setMovieData({
                            movieList: response.data.results,
                            currentPage: response.data.page,
                            totalPages: response.data.total_pages,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }
        else if (optionValue == 1) {
            axios.get(`${requests.searchTv}&page=${movieData.currentPage}${param.length > 0 ? `&query=${param}` : null}`)
                .then((response) => {
                    if (!response.data.errors) {
                        setMovieData({
                            movieList: response.data.results,
                            currentPage: response.data.page,
                            totalPages: response.data.total_pages,
                        });
                    }
                })
                .catch((err) => console.log(err));
        }

    }, [movieData.currentPage, param, optionValue]);

    const handleCounter = (value) => {
        setCounter((prev) => prev + value);
    };

    const handleOnPageChange = (value) => {
        setMovieData({
            currentPage: value,
        });
    };
    const handleImageClick = (movie) => {
        if (movie !== undefined) {
            navigate(`/movieDetail?movieId=${movie.id}&movieType=${optionValue==1?"NETFLIX ORIGINALS":"All"}`, { state: { clickedMovie: movie } })
        }
        else alert('Movie details not found');
    }

    const handleSearch = () => {
        setParam(encodeURIComponent(searchText));
    }

    return (
        <div style={{ textAlign: "center", overflowX: "hidden" }} >
            <div style={{ marginBottom: "20px" }} >
                <select className="select_design" onChange={(e) => setOptionValue(e.target.value)}>
                    <option key='0' value='0' selected>search in movies</option>
                    <option key='1' value='1'>search in tv</option>
                </select>
                <input className='input_field' type='text' value={searchText} onChange={(e) => setSearchText(e.target.value)}></input>
                <button onClick={handleSearch} className="button_design1">search</button>
            </div>
            <div className="row row-cols-2 row-cols-md-5 g-4" style={{ marginTop: "0px" }} >
                {movieData.movieList && movieData.movieList.length > 0
                    ? movieData.movieList.map((movie, index) => {
                        return (
                            <div key={index} className="col" style={{ marginTop: "0px" }} >
                                <div className="card h-100" style={{ border: "none" }} >
                                    <img
                                        key={movie.id}
                                        className="card-img-top"
                                        src={`${movie.poster_path ? `${base_url}${movie.poster_path}` : "Assets/no_image_found.jpg"}`}
                                        style={{ height: "15vw" }}
                                        onClick={() => handleImageClick(movie)}
                                    />
                                    <div className="card-body" style={{ color: "black", textAlign: "left" }} >
                                        <h5 className="card-title">{movie.title}</h5>
                                        <p className="card-text"><i className="fa-solid fa-star" style={{ color: "sandybrown" }}><span style={{ color: "black" }}> {movie.vote_average}</span></i></p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : null}
            </div>
            <div style={{ marginTop: "20px" }} >
                {movieData.totalPages > 1 ? (
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
    )
}
export default SearchBar;