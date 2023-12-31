//using sample data
//import filmData from "../../../../sample_fillm_data.json";

import HorizontalScroll from "./HorizontalScroll";
import { useState, useEffect } from "react";
import axios from "axios";


export default function Home() {
  const [movieData, setMovieData] = useState(null);
  const [actorData, setActorData] = useState(null);
  const [authoToken , setAuthToken] = useState(null);


  async function checkToken(){
    const authToken = await localStorage.getItem("authToken");
            await setAuthToken(authToken);
    }

  async function getMovies() {
    const URL = "https://imdb-replica.onrender.com/api/movies";

    axios
      .get(URL)
      .then((res) => {
        setMovieData(res.data);
      })
      .catch((e) => console.log(e));
  }

  async function getActors() {
    const URL = "https://imdb-replica.onrender.com/api/actors";

    axios
      .get(URL)
      .then((res) => {
        setActorData(res.data);
      })
      .catch((e) => console.log(e));
  }


  // async function addToWatchList(movie , tk){

  //   const URL = 'https://imdb-replica.onrender.com/api/add-to-watchlist'

  //   if(tk !== null || tk !== undefined){
  //     await axios.post(URL,{
  //       "title": movie.title
  //     },{
  //       headers:{
  //         Authorization:tk,
  //     }
  //     })
  //     .then(res => console.log(res))
  //     .catch(error => console.log(error))
  //     }
  //   }



  useEffect(() => {
    getMovies();
    getActors();
  }, []);

  useEffect(()=>{
    checkToken();
  },[authoToken])



  return (
    <>




      {movieData !== null && movieData !== undefined &&  actorData !== null && actorData !== undefined && (
        <div>
          <h3 className=" col-11  mx-auto px-3">top picks</h3>
          <p className="  col-11  mx-auto px-3 text-secondary">
            TV shows and movies just for you
          </p>
          <HorizontalScroll
            movies={movieData
              .filter((movie) => movie.IMDB_rating > 8.8)
              .sort((a, b) => b.IMDB_rating - a.IMDB_rating)}
          ></HorizontalScroll>

          <h3 className=" col-11  mx-auto px-3 my-5">
            Top 10 on IMDb this week
          </h3>
          <HorizontalScroll movies={movieData}></HorizontalScroll>
          <h3 className=" col-11  mx-auto px-3 mt-5">Fan favorites</h3>
          <p className="  col-11  mx-auto px-3 text-secondary">
            This week top movies
          </p>
          <HorizontalScroll
            movies={[...movieData].sort(() => Math.random() - 0.5)}
          ></HorizontalScroll>

          {/* <h3 className=" col-11  mx-auto px-3 my-5">Famous People</h3>
          <HorizontalScroll
            actors={[...actorData].sort(() => Math.random() - 0.5)}
          ></HorizontalScroll> */}
        </div>
      )}
    </>
  );
}
