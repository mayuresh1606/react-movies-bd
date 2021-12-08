import { useGlobalContext } from "./context"
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";

export const Popularity = () => {
    const { movies, fetchPopularMovies, fetchPopularSeries, pages, moviesActive, setMoviesActive } = useGlobalContext();

    const {currentPage} = useParams();
    
    useEffect(() => {
        if (moviesActive){
            fetchPopularMovies(currentPage);
        }
        else{
            fetchPopularSeries(currentPage)
        }
        console.log('useeffect called popularity');
    }, [currentPage, moviesActive])
    return <section className="popularity-container">
        <section className="btn-container">
            <button onClick={() => {
                setMoviesActive(true);
                fetchPopularMovies(currentPage);
                }} className="btn-popularity"><span className="center-margin">Movies</span> <div className={moviesActive?`underline underline-active`:`underline`}></div></button>
            <button onClick={() => {
                setMoviesActive(false);
                fetchPopularSeries(currentPage)
            }} className="btn-popularity"><span className="center-margin">Series</span> <div className= {moviesActive?`underline`:`underline underline-active`}></div></button>
        </section>
        <section className="movies-container container-organized">
                {
                movies?movies.map((movie, index) => {
                    const {poster_path, title, release_date, id, name, first_air_date} = movie
                    return (
                    <div className="movie-details" key={id}>
                    <Link to={`/${(first_air_date && 'series') || (release_date && 'movie')}/details/${title || name}/${id}`}>
                        <article onMouseOut={(e) => {e.currentTarget.lastElementChild.classList.add('hidden')}} onMouseOver={(e) => {e.currentTarget.lastElementChild.classList.remove("hidden")}} key={index} className="movie-card">
                            <img className="movie-poster" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`} alt={title} />
                            <div className={`movie-info ${window.innerWidth > 600 && 'hidden'}`}>
                                <h3 className="font-weight">{name || title}</h3>
                                <h4 className="font-weight">Release Date : {release_date || first_air_date}</h4>
                            </div>
                        </article>
                    </Link>
                    </div>
                    )
                }):<h2 className="danger-heading">Nothing to display</h2>
                }
            </section>
        <section className="pages-btn-container">
            {pages? pages.map((page, index) => {
                index = index + 1
                if (pages.length > 6){
                    if (index <= 3){
                        return <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                            if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                        }} className={`${currentPage == index?`pagination-btn current-page-btn`:`pagination-btn`}`}>{index}</button></Link>
                    }
                    if (currentPage - index <= 2 && currentPage - index >= 1){
                            return <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                                if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                            }} className="pagination-btn">{page}</button></Link>
                        }
                    if (currentPage == index){
                        return <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                            if (moviesActive)
                            fetchPopularMovies(page)
                            else
                            fetchPopularSeries(page)
                        }} className="pagination-btn current-page-btn">{page}</button></Link>
                    }
                    if (index > currentPage && index - currentPage <= 2){
                            return <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                                if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                            }} className="pagination-btn">{index}</button></Link>
                        }
                    if (pages.length - index <= 2){
                        return <><div className="hidden"></div> <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                            if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                        }} className={`${currentPage === index?`pagination-btn current-page-btn`:'pagination-btn'}`}>{index}</button></Link></>
                    }
                    else{
                        return <div className="hidden" key={index}>.</div>
                    }
                }
                else{
                    return <Link key={index} className="required-width" to={`/popularity/${index}`}><button onClick={() => {
                        if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                    }} className={`${currentPage == index?`pagination-btn current-page-btn`:'pagination-btn'}`}>{index}</button></Link>
                }
            }) : <div className="hidden"></div> }
        </section>
    </section>
}