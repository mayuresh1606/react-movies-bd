import React, { useContext, useState } from "react";
import { useEffect } from "react";
const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [movies, setMovies] = useState([]);
    const [value, setValue] = useState('one piece');
    const [moviesActive, setMoviesActive] = useState(true);
    const [genresList, setGenresList] = useState([]);
    const [movieId, setMovieId] = useState(0);
    const [loaded, setLoaded] = useState(true);
    const [pages, setPages] = useState(0);
    const [details, setDetails] = useState([{}]);
    const [sidebar, setSidebar] = useState(false);
    const [tempMovies, setTempMovies] = useState([]);

    const newApi = async () => {
        setLoaded(false)
        const url = `https://www.omdbapi.com/?s=${value? value.length >= 3? value:'one piece':'one piece'}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.Search)
        setLoaded(true)
    }

    // genres fetch
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
    const fetchGenres = async() => {
        const response = await fetch(genreUrl);
        const data = await response.json();
        const {genres} = data
        setGenresList(genres);
    }
    // fetch single movie details
    const fetchTvdbSeries = async (id) => {
                const url = `https://api.themoviedb.org/3/find/${id}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&external_source=tvdb_id`
                const response = await fetch(url);
                const data = await response.json()
                console.log(data);
                if (data.tv_results || data.tv_episode_results){
                    setDetails(data.tv_results || data.tv_episode_results);
                }
            }

    const fetchDetails = async (title, type, id) => {
        // setLoaded(false);
        const url = `https://www.omdbapi.com/?t=${title}&type=${type}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`
        const response = await fetch(url)
        const data = await response.json();
        if (data.Error){
            console.log(data);
            fetchTvdbSeries(id);
        }
        else{
            setDetails([data]);
        }
        // setLoaded(true);
    }
    const fetchPopularMovies = async (pageNo) => {
        // setLoaded(false);
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate`
        let pagesList = [];
        const response = await fetch(url)
        const data = await response.json()
        setMovies(data.results);
        setPages(() => {
            for (let i = 1; i <= data.total_pages; i++){
                pagesList = [...pagesList, i]
            }
            return pagesList;
        });
        // setLoaded(true)
    }
    const fetchPopularSeries = async (pageNo) => {
        // setLoaded(false)
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${pageNo}&with_watch_monetization_types=flatrate`;
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results)
        // setLoaded(true)
    }
    useEffect(()=> {
        fetchGenres();
        console.log('useEffect called new API');
        newApi();
    }, [value])

    return <AppContext.Provider value={{tempMovies, setTempMovies, fetchPopularMovies, fetchPopularSeries, fetchDetails, fetchGenres, newApi, sidebar, setSidebar, moviesActive, setMoviesActive, details, setDetails, pages, setPages, loaded, setLoaded, movieId, setMovieId, genresList, movies, setValue, value, setMovies}}>{children}</AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext)
}