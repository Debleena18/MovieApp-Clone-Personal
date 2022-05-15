import React, { useState } from "react";
import './MovieRow.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer'

const MovieRow = ({ title, items }) => {
    const [trailerUrl, setTrailerUrl] = useState("");
    const [scrollX, setScrollX] = useState(0);

    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        if(x > 0) {
            x = 0;
        }
        setScrollX(x);
    }
    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        let listW = items.results.length * 150;
        if ((window.innerWidth - listW) > x) {
            x = (window.innerWidth - listW) - 60;
        }
        setScrollX(x);
    }

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
          autoplay:1,
        },
      }

      const handleClick = (movie) => {
        if(trailerUrl){
          setTrailerUrl("");
        }else{
          movieTrailer(movie?.name || "")
          .then(url => {
            const urlParams = new URLSearchParams( new URL(url).search);
            setTrailerUrl(urlParams.get('v'));
   
          }).catch(error => console.log(error))
        }
    };

    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--left" onClick={handleLeftArrow}>
            <FaAngleLeft style={{fontSize: 50}} />
            </div>
            <div className="movieRow--right">
            <FaAngleRight style={{fontSize: 50}} onClick={handleRightArrow}/>
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list" style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                    }}>
                    {items.results.length > 0 && items.results.map((item, key) => (
                       <div key={key} onClick={()=> handleClick(item)} className="movieRow--item">
                        <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                    </div>
                    ))}
                </div>
            </div>
            
            {trailerUrl && <YouTube
             videoId={trailerUrl}  
             opts={opts}
            />}
        </div>
    );
}
export default MovieRow;