import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loader from "react-loader-spinner";
import "./index.css";
import RatingStars from "../RatingStars";
import Header from "../Header";

function Anime(props) {
  const [AnimeDetails, setAnimeDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = props.match.params;
  const token = Cookies.get("token");

  useEffect(() => {
    async function fetchData() {
      const apiUrl = `https://api.aniapi.com/v1/anime/${id}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        authorization: `Bearer ${token}`
      });
      const data = await response.json();

      const convertedData = convertData(data);
      setAnimeDetails(convertedData);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  function convertData(info) {
    const { data } = info;
    // const { documents } = data;
    const convertedData = {
      anilistId: data.anilist_id,
      malId: data.mal_id,
      format: data.format,
      status: data.status,
      titles: data.titles,
      descriptions: data.descriptions,
      startDate: data.start_date,
      endDate: data.end_date,
      seasonPeriod: data.season_period,
      seasonYear: data.season_year,
      episodesCount: data.episodes_count,
      episodeDuration: data.episode_duration,
      trailerUrl: data.trailer_url,
      coverImage: data.cover_image,
      coverColor: data.cover_color,
      bannerImage: data.banner_image,
      genres: data.genres,
      score: data.score,
      id: data.id
    };
    console.log("convertedData", convertedData);
    return convertedData;
  }

  function renderLoading() {
    return (
      <div>
        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
      </div>
    );
  }

  function renderAnime() {
    const {
      titles,
      descriptions,
      genres,
      score,
      seasonYear,
      episodesCount,
      id,
      coverImage,
      bannerImage
    } = AnimeDetails;

    return (
      <div className="bg-container1">
        <Header />
        <div className="item-container">
          <img src={bannerImage} className="cover-img" />
          <h1 className="title">{titles.en}</h1>
          <p className="description">{descriptions.en}</p>
          <h1 className="genre-heading">Genres</h1>
          <div className="genres-list">
            {genres.map((genre) => (
              <span key={genre}>{genre} </span>
            ))}
          </div>
          <div>
            <div>
              <p className="season-yr">Season {seasonYear}</p>
              <p className="episodes">Episodes {episodesCount}</p>
            </div>
            <div>
              <p className="ratings">ratings {score}</p>
            </div>
          </div>
        </div>
        <RatingStars />
      </div>
    );
  }

  function renderView() {
    switch (isLoading) {
      case true:
        return renderLoading();
      case false:
        return renderAnime();

      default:
        return null;
    }
  }

  return (
    <div>
      <h1>Specific Anime Route</h1>
      {renderView()}
    </div>
  );
}
export default Anime;
