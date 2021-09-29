import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import Header from "../Header";
import HomeAnimeCard from "../HomeAnimeCard";
import "./index.css";

const apiUrl = "https://api.aniapi.com/v1/anime";
function Home(props) {
  const { hash } = props.location;
  const token = hash.split("=")[1];
  console.log(token);
  Cookies.set("token", token);
  const [animeData, setAnimeData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(apiUrl, {
        method: "GET",
        Authorization: `Bearer ${token}`
      });
      const data = await response.json();

      const convertedData = convertData(data);
      // console.log(convertedData);
      setAnimeData(convertedData);
    }
    fetchData();
  }, []);

  const updateSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const convertData = (info) => {
    const { documents } = info.data;
    // const { documents } = data;
    const convertedData = documents.map((each) => ({
      anilistId: each.anilist_id,
      malId: each.mal_id,
      format: each.format,
      status: each.status,
      titles: each.titles,
      descriptions: each.descriptions,
      startDate: each.start_date,
      endDate: each.end_date,
      seasonPeriod: each.season_period,
      seasonYear: each.season_year,
      episodesCount: each.episodes_count,
      episodeDuration: each.episode_duration,
      coverImage: each.cover_image,
      coverColor: each.cover_color,
      bannerImage: each.banner_image,
      genres: each.genres,
      score: each.score,
      id: each.id
    }));
    return convertedData;
  };

  const getFilteredData = () => {
    const filteredData = animeData.filter((each) => {
      const { titles, descriptions, genres } = each;
      // console.log(titles, descriptions, genres);
      const title = titles.en;
      const desc = descriptions.en;
      const isInGenre = genres.some((genre) => genre.includes(searchInput));
      const isInTitle = title.includes(searchInput);
      const isInDescription = desc.includes(searchInput);
      return isInGenre || isInTitle || isInDescription;
    });
    return filteredData;
  };

  const filteredData = getFilteredData();

  return (
    <div className="bg-container">
      <Header />
      <div className="animie-section">
        <input
          type="search"
          value={searchInput}
          onChange={updateSearchInput}
          placeholder="Browse Anime by genre,title"
          className="searchInput"
        />

        <ul className="animie-list-container">
          {filteredData.map((each) => (
            <HomeAnimeCard key={each.id} anime={each} />
          ))}
        </ul>
      </div>
    </div>
  );
}
export default Home;
