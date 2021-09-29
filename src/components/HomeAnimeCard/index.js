import { Link } from "react-router-dom";
import "./index.css";

function HomeAnimeCard(props){
  const {anime} = props;
  const {titles,descriptions,genres,score,seasonYear,episodesCount,id,coverImage} = anime;
  return (
    <Link to={`${id}`} className="link">
    <li className="item-container">
      {/* {anime name/title
      Trailer url
      genres
      description
      current rating
      season year
      no of episodes} */}
      
          <img src={coverImage} className="cover-img"/>
          <h1 className="title">{titles.en}</h1>
          <p className="description">{descriptions.en}</p>
          <h1 className="genre-heading">Genres</h1>
          <ul className="genres-list">{genres.map(genre => <span>{genre} </span>)}</ul>
          <div>
            <div>
            <p className="season-yr">Season {seasonYear}</p>
            <p className="episodes">Episodes {episodesCount}</p>
            </div>
            <div>
              <p className="ratings">ratings {score}</p>
            </div>
          </div>
          
    </li>
    </Link>
  )
}

export default HomeAnimeCard