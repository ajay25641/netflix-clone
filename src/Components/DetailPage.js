import React from 'react'
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from '../axios';
import YoutubeEmbed from './YoutubeEmbed';

const API_KEY = '7f5818df9df5b63b9d68dbd47b4f79fa';
const base_url = "https://image.tmdb.org/t/p/original";

export const DetailPage = () => {
    const qs = useLocation().search;
    const location = useLocation();
    const { clickedMovie } = location.state;
    const { movieId, movieType } = queryString.parse(qs);
    const [movieVideos, setMovieVideos] = useState([]);
    const [trailerid, setTrailerId] = useState("");
    const [isYoutubeFrameOpen, setYoutubeFrameState] = useState(false);
    useEffect(() => {
        if (movieType == 'NETFLIX ORIGINALS') {
            axios.get(`/tv/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
                .then((res) => {
                    setMovieVideos(res.data.results);
                    setTrailerId(res.data.results.find((movie) => movie.type === "Trailer").key);
                })
                .catch((err) => console.log(err));
        }
        else {
            axios.get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
                .then((res) => {
                    setMovieVideos(res.data.results);
                    setTrailerId(res.data.results.find((movie) => movie.type === "Trailer").key);
                }).catch((err) => console.log(err));
        }
    }, [])
    const handleTrailerPlay = () => {
        if(trailerid.length>0){
            setYoutubeFrameState(true);
        }
      else{
          alert('Sorry , No Trailer found for this movie...')
      }
    }
    const handleClose = () => {
        setYoutubeFrameState(false);
    }
    return (
        <div style={{overflowX:"hidden"}} >
            <div className="card h-100" style={{ maxWidth: "100%", border: "none", marginTop: "10px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img
                            style={{ height: "40vw" }}
                            className="img-fluid rounded-start"
                            src={`${clickedMovie.poster_path !==null||undefined?`${base_url}${clickedMovie.poster_path}`:"Assets/no_image_found.jpg"}`}
                        />
                    </div>
                    <div className="col-md-8">
                        {isYoutubeFrameOpen == true &&
                            trailerid && trailerid.length > 0 ?
                            (<div>
                                <YoutubeEmbed embedId={trailerid} />
                                <button className="btn btn-danger" style={{ width: "100%", height: "50px", color: "white", fontSize: "25px", fontWeight: "bolder", fontfamily: "-webkit-body" }} onClick={handleClose}>Close</button>
                            </div>
                            )
                            :
                            (
                                <div className="card-body" style={{ color: "black" }} >
                                    <h2 className="card-title">{clickedMovie.title || clickedMovie.name}</h2>
                                    <h5>Overview</h5>
                                    <p className="card-text">{clickedMovie.overview}</p>
                                    <p className="card-text"><small className="text-muted">Release Date: {clickedMovie.release_date || clickedMovie.first_air_date}</small></p>
                                    <p className="card-text"><i className="fa-solid fa-star" style={{ color: "sandybrown" }}><span style={{ color: "black" }}> {clickedMovie.vote_average}</span></i></p>
                                    <p className="card-text"><button className="btn btn-primary" style={{ width: "100%", height: "50px", color: "white", fontSize: "25px", fontWeight: "bolder", fontfamily: "-webkit-body" }} onClick={handleTrailerPlay}>Play Trailer</button></p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
            <hr style={{ marginBottom: "0px" }} />
            <div style={{ marginLeft: "20px", fontSize: "x-large", fontWeight: "bold", color: "darkblue" }}>More videos</div>
            <hr style={{ marginTop: "5px" }} />
            <div className="row row-cols-2 row-cols-md-5 g-4">
                {movieVideos && movieVideos.length > 0
                    ? movieVideos.map((movie, index) => {
                        return (
                            <div key={index} className="col">
                                <div className="card h-100" style={{ border: "none" }} >
                                    <div className="card-img-top" style={{ height: "12vw" }}>
                                        <YoutubeEmbed embedId={movie.key} />
                                    </div>

                                    <div className="card-body" style={{ color: "black",padding:"0px" }}>
                                        <p className="card-title" style={{fontSize:"large",fontWeight:"normal",color:"darkslateblue"}} >{movie.name}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                    : null}
            </div>
        </div>
    )
}
