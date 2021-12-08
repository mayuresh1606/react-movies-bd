import { useGlobalContext } from "./context";
import { Link } from "react-router-dom";
export const Movies = () => {
    const {movies, genresList} = useGlobalContext();
    
    return <section className="container">
        <section className="movies-section">
            <section className="movies-container">
                {
                movies?movies.map((movie, index) => {
                    const {Poster, Title, Type, Year, imdbID} = movie
                    return (
                    <div className="movie-details" key={index}>
                    <Link className="movies-link" to={`${Type}/details/${Title}/${imdbID}/`}>
                        <article onMouseOut={(e) => {e.currentTarget.lastElementChild.classList.add('hidden')}} onMouseOver={(e) => {e.currentTarget.lastElementChild.classList.remove("hidden")}} key={index} className="movie-card">
                            <img className="movie-poster" src={Poster} alt={Title} />
                            <div className={`movie-info links ${window.innerWidth > 886 && 'hidden'}`}>
                                <h3 className="font-weight">{Title}</h3>
                                <h4 className="font-weight">Release Year : {Year}</h4>
                            </div>
                        </article>
                    </Link>
                    </div>
                    )
                }):<h2 className="danger-heading">Nothing to display</h2>
                }
            </section>
        </section>
        <article className="genres-list">
            <h4 className="align-text">Genres</h4>
            <article className="genres-boxes">
            <article className="genre-box-1">
                {genresList.map((genre)=>{
                    const {name, id} = genre
                    return <Link className='links' to={`/genre/${name}/${id}/1`}><span className="movies-heading" onClick={() => console.log(id)}>{name}</span></Link>
                })}
            </article>
            </article>
        </article>
    </section>
}