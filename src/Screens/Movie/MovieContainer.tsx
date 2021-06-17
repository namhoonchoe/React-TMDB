import React,{useState,useEffect} from "react";
import MoviePresenter from "./MoviePresenter";
import { movieApi } from "../../Api";

interface IMovieData {
    nowPlaying:null,
    upComing:null,
    popular:null
    }

const MovieContainer:React.FC = () => {
    const [movie,setMovie] = useState<IMovieData>({ 
        nowPlaying:null,
        upComing:null,
        popular:null})
    const [error,setError] = useState<string|null>(null)
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() =>{
    const movieData = async() =>{
        try { 
        const { 
            data:{ results:nowPlaying } 
            } = await movieApi.nowPlaying();

        const {
            data: { results: upComing },
            } = await movieApi.upComing();

        const {
            data: { results: popular },
            } = await movieApi.popular();

            setMovie({...movie,nowPlaying,upComing,popular})

        } catch {   
            setError("can't find movie data")
        } finally {
            setLoading(false)
        }
    } 
    movieData()

    },[movie])
    const {nowPlaying,upComing,popular} = movie
    return (
        <div>
            <MoviePresenter
                nowPlaying={nowPlaying}
                upComing={upComing}
                popular={popular}
                error={error}
                loading={loading}
            />
        </div>
    )
}



export default MovieContainer