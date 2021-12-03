import React from 'react'
import movieTrailer from "movie-trailer";
import YoutubeEmbed from "./YoutubeEmbed";
import { useState } from 'react';
const base_url = "https://image.tmdb.org/t/p/original";

export const DetailModal = ({clickedMovie , handleModalState}) => {

    const [trailerid, setTrailerId] = useState("");
    const [isYoutubeFrameOpen, setYoutubeFrameState] = useState(false);
    const handleTrailerPlay = () => {
        console.log(clickedMovie)
        movieTrailer(null ,{ tmdbId: clickedMovie.id, id: true }, (err, res) => {
            console.log(res);
            if (res !== null) {
                setTrailerId(res);
                setYoutubeFrameState(true);
            }
            else {
                setTrailerId("");
                alert('Sorry , unable to find any trailer for this movie');

            }
        })
    }
    const handleClose = () => {
        setTrailerId("");
        setYoutubeFrameState(false);
        }
     
    return (
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
                                {
                                    trailerid && trailerid.length >0 ?
                                        (<div>
                                            <YoutubeEmbed embedId={trailerid}/>
                                            <button className="btn btn-danger" style={{ width: "100%", height: "50px", color: "white", fontSize: "25px", fontWeight: "bolder", fontfamily: "-webkit-body" }} onClick={handleClose}>Close</button>
                                            </div>
                                        )
                                        :
                                        (
                                            <div className="card-body" style={{ color: "black" }} >
                                                <h2 className="card-title">{clickedMovie.title || clickedMovie.name}</h2>
                                                <h5>Overview</h5>
                                                <p className="card-text">{clickedMovie.overview}</p>
                                                <p className="card-text"><small className="text-muted">Release Date: {clickedMovie.release_date ||clickedMovie.first_air_date}</small></p>
                                                <p className="card-text"><i className="fa-solid fa-star" style={{ color: "sandybrown" }}><span style={{ color: "black" }}> {clickedMovie.vote_average}</span></i></p>
                                                <p className="card-text"><button className="btn btn-primary" style={{ width: "100%", height: "50px", color: "white", fontSize: "25px", fontWeight: "bolder", fontfamily: "-webkit-body" }} onClick={handleTrailerPlay}>Play Trailer</button></p>
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className={`btn btn-danger ${isYoutubeFrameOpen ? "btn disabled" : null}`} data-bs-dismiss="modal" onClick={handleModalState}>Close</button>
                </div>
            </div>
        </div>
    </div>
    )
}
