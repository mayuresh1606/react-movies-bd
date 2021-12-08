import { useGlobalContext } from "./context"
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export const Genre = () => {
    let {moviesActive, pages, genresList, setPages, setMoviesActive, tempMovies, setTempMovies,} = useGlobalContext();
    const {id, currentPage, movieGenre} = useParams();
    let temporary = []
    let tempData = []
    const fetchPopularMovies = async (page) => {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        setTempMovies(() => {
            for (const result of data.results){
                tempData = [...tempData, result];
            }
            for (const data of tempData){
                temporary = [...temporary, data]
            }
            return temporary;
        })
        let pagesList = [];
        setPages(() => {
            for (let i = 1; i <= data.total_pages; i++){
                pagesList = [...pagesList, i]
            }
            return pagesList;
        });
    }

    const fetchPopularSeries = async (page) => {
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`;
        const response = await fetch(url)
        const data = await response.json()
        console.log(data);
        setTempMovies(() => {
            for (const result of data.results){
                tempData = [...tempData, result];
            }
            for (const data of tempData){
                temporary = [...temporary, data]
            }
            return temporary;
        })
        let pagesList = [];
        setPages(() => {
            for (let i = 1; i <= data.total_pages; i++){
                pagesList = [...pagesList, i]
            }
            return pagesList;
        });
    }
    let moviesCount = false;
    useEffect(()=> {
        if (moviesActive){
        fetchPopularMovies(currentPage);
        }
        else{
        fetchPopularSeries(currentPage)
        }
        console.log("useEffect called genre");
    }, [id, moviesActive])

    return <section className="container">
        <section className="movies-section">
            <section className="btn-container">
                <button onClick={() => {
                    setMoviesActive(true);
                    fetchPopularMovies(currentPage);
                    }} className="btn-popularity"><span className="center-margin">Movies</span> <div className={moviesActive?`underline underline-active`:`underline`}></div></button>
                <button onClick={() => {
                    setMoviesActive(false);
                    fetchPopularSeries(currentPage);
                }} className="btn-popularity"><span className="center-margin">Series</span> <div className= {moviesActive?`underline`:`underline underline-active`}></div></button>
            </section>
            <section className="movie-names">
                <h2 className="movie-pop-heading">{moviesActive?'Movies':'Series'} according to popularity: </h2>
                {tempMovies && tempMovies.map((movie) => {
                    const {first_air_date, release_date, title, name} = movie;
                    return <Link className="links" to={`/${(first_air_date && 'series') || (release_date && 'movie')}/details/${title || name}/${id}`}>
                        <span className="movies-heading">{title || name}</span></Link>
                })}
            </section>
            <h2>Filtered {movieGenre} {moviesActive?'movies':'series'}: </h2>
            <section className="movies-container">
                {
                tempMovies && tempMovies != undefined?tempMovies.map((movie, index) => {
                    const {poster_path, title, release_date, id:movieId, name, first_air_date, genre_ids} = movie;
                    // console.log(genre_ids);
                    for (let genreId of genre_ids){
                        if (parseInt(id) === genreId){
                            moviesCount = true;
                            return (
                            <div className="movie-details" key={index}>
                            <Link className="movies-link" to={`/${(first_air_date && 'series') || (release_date && 'movie')}/details/${title || name}/${id}`}>
                                <article onMouseOut={(e) => {e.currentTarget.lastElementChild.classList.add('hidden')}} onMouseOver={(e) => {e.currentTarget.lastElementChild.classList.remove("hidden")}} key={index} className="movie-card">
                                    <img className="movie-poster" src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${poster_path}`} alt={title} />
                                    <div className={`movie-info ${window.innerWidth > 886 && 'hidden'}`}>
                                        <h3 className="font-weight">{title}</h3>
                                        <h4 className="font-weight">Release Year : {release_date || first_air_date}</h4>
                                    </div>
                                </article>
                            </Link>
                            </div>
                            )
                        }
                    }
                }):<h2 className="danger-heading">Nothing to display</h2>
                }{!moviesCount && <h3 className="danger-heading">None of the {moviesActive?"Movies":'Series'} match the category you are looking for</h3> }
            </section>
        </section>
        <article className="genres-list">
            <h4 className="align-text">Genres</h4>
            <article className="genres-boxes">
            <article className="genre-box-1">
                {genresList.map((genre)=>{
                    const {name, id} = genre
                    return <Link className="links" to={`/genre/${name}/${id}/${currentPage}`}><span className="movies-heading" onClick={() => {
                        console.log(id)
                        fetchPopularMovies();
                    }}>{name}</span></Link>
                })}
            </article>
            </article>
        </article>
        <section className="pages-btn-container">
            {pages? pages.map((page, index) => {
                index = index + 1
                if (pages.length > 6){
                    if (index <= 3){
                        return <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
                            if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                        }} className={`${currentPage == index?`pagination-btn current-page-btn`:`pagination-btn`}`}>{index}</button></Link>
                    }
                    if (currentPage - index <= 2 && currentPage - index >= 1){
                            return <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
                                if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                            }} className="pagination-btn">{page}</button></Link>
                        }
                    if (currentPage == index){
                        return <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
                            if (moviesActive)
                            fetchPopularMovies(page)
                            else
                            fetchPopularSeries(page)
                        }} className="pagination-btn current-page-btn">{page}</button></Link>
                    }
                    if (index > currentPage && index - currentPage <= 2){
                            return <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
                                if (moviesActive)
                            fetchPopularMovies(index)
                            else
                            fetchPopularSeries(index)
                            }} className="pagination-btn">{index}</button></Link>
                        }
                    if (pages.length - index <= 2){
                        return <><div className="hidden"></div> <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
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
                    return <Link key={index} className="required-width" to={`/genre/${movieGenre}/${id}/${index}`}><button onClick={() => {
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