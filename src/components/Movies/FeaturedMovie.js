import React, { useState } from 'react';
import './FeaturedMovie.css';
import { FaPlay, FaPlus } from 'react-icons/fa';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

const FeaturedMovie = ({ item }) => {
    const [movie, setMovie] = useState([]);
    const [trailerurl, setTrailerurl] = useState("");

    let firstDate = new Date(item.first_air_date);
    let genres = [];
    for(let i in item.genres) {
        genres.push( item.genres[i].name );
    }

    function truncate(str ,n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str; 
     };

    const handleClick = (item) => {
        
        if(trailerurl){
          setTrailerurl("");
        }else{
          movieTrailer(item?.name || "")
          .then(url => {
            const urlParams = new URLSearchParams( new URL(url).search);
            setTrailerurl(urlParams.get('v'));
   
          }).catch(error => console.log(error))
        }
    };

    const opts = {
              height: "390",
              width: "100%",
              playerVars: {
                autoplay:1,
              },
        }

    return (
        <section className="featured" 
        onClick={() => setTrailerurl("")}
        style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>

        <div>
            <h1 className="featured--description">
                {truncate(movie?.overview, 150)}
            </h1>
        </div>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">
                        {item.original_name}
                    </div>
                    <div className="featured--info">
                        <div className="featured--points">{item.vote_average} points</div>
                        <div className="featured--year">{firstDate.getFullYear()}</div>
                        <div className="featured--seasons">{item.number_of_seasons}seasons{item.number_of_seasons !== 1 ? 's' : ''}</div>
                    </div>
                    <div className="featured--description">{item.overview}</div>
                    <div className="featured--buttons">
                        <a href='/watch/${item.id}' onClick={()=> handleClick(item)} 
                            className="featured--watchbutton"><FaPlay size={13} />
                            Play
                        </a>
                        <a href='/list/add/${item.id}' className="featured--mylistbutton"><FaPlus size={13} />
                             Wish List
                        </a>
                    </div>
                    <div className="featured--genres"><strong>Genre:</strong> {genres.join(', ')}</div>
                </div>
            </div>

            {trailerurl && <YouTube
             videoId={trailerurl}  
             opts={opts}
            />} 
            
        </section>
    );
}
export default FeaturedMovie;