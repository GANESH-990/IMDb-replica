//using sample data
import filmData from "../../../../sample_fillm_data.json";

import HorizontalScroll from "./HorizontalScroll";



export default function Home() {
  return (
    <>
      <h3 className=" col-11  mx-auto px-3">top picks</h3>
      <p className="  col-11  mx-auto px-3 text-secondary">TV shows andmovies just for you</p>
      <HorizontalScroll movies={filmData.filter(movie => movie.IMDB_rating >8.8).sort((a,b)=> b.IMDB_rating - a.IMDB_rating)}></HorizontalScroll>



      <h3 className=" col-11  mx-auto px-3 my-5">Top 10 on IMDb this week</h3>
      <HorizontalScroll movies={filmData}></HorizontalScroll>
      <h3 className=" col-11  mx-auto px-3 mt-5">Fan favorites</h3>
      <p className="  col-11  mx-auto px-3 text-secondary">This week top movies</p>
      <HorizontalScroll movies={ [...filmData].sort(() => Math.random() - 0.5) }></HorizontalScroll> 



    </>
  );
}
