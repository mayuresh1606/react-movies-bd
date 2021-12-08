import { useEffect } from "react";
import { useParams } from "react-router"
import { useGlobalContext } from "./context";

export const Details = () => {
    const {details, setLoaded, fetchDetails} = useGlobalContext();
    const {title, type, id} = useParams();
    let movieTitle = title
    movieTitle = movieTitle.split("")
    let newChar = ''
    movieTitle.map((char) => {
        if (char === " "){
            char = '+'
            newChar += char
            return char
        }
        newChar += char
        return char
    })
    
    useEffect(() => {
        setLoaded(false)
        fetchDetails(newChar, type, id);
        console.log("useEffect called details");
        setLoaded(true)
    }, [title])

    return <>
            {details.map((movieList, index) => {
                    const {Plot,Released, air_date, Title, imdbRating, imdbID, Poster, Actors, Awards, Country, Genre, Language} = movieList
                    return <section className="single-movie-container" key={index}>
                        <section className="single-movie">
                            <article className="single-movie-img">
            <img src={Poster} className="movie-poster single-movie-poster" alt="" />
        </article>
        <article className="single-movie-info">
                    <div className="single-movie-details" key={imdbID}>
                        <h2 className="needed-margin"><span className="text-highlight">Title: </span>{Title}</h2>
                        <p className="needed-margin"><span className="text-highlight">Overview: </span>{Plot}</p>
                        <p className="needed-margin"><span className="text-highlight">Actors: </span>{Actors}</p>
                        <p className="needed-margin"><span className="text-highlight">Release Date: </span>{Released || air_date}</p>
                        <p className="needed-margin"><span className="text-highlight">Awards: </span>{Awards}</p>
                        <p className="needed-margin"><span className="text-highlight">Country: </span>{Country}</p>
                        <p className="needed-margin"><span className="text-highlight">Genre: </span>{Genre}</p>
                        <p className="needed-margin"><span className="text-highlight">Language: </span>{Language}</p>
                        <p className="needed-margin"><span className="text-highlight">Imdb Rating: </span>{imdbRating}</p>
                    </div>
        </article>
                    </section>
                    </section>
            })}
            </>
}
