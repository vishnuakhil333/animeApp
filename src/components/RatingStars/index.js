import React, { useState } from "react";
import "./index.css";
import { StarsRating } from "stars-rating-react-hooks";

function RatingStars() {
  const config = {
    totalStars: 5,
    initialSelectedValue: 4.5,
    renderFull: (
      <img
        className="stars"
        src="https://img.icons8.com/ios-filled/50/000000/star--v1.png"
        alt="full stars"
      />
    ),
    renderEmpty: (
      <img
        className="stars"
        src="https://img.icons8.com/ios/50/000000/star--v1.png"
        alt="halg stars"
      />
    ),
    renderHalf: (
      <img
        className="stars"
        src="https://img.icons8.com/ios-filled/50/000000/star-half-empty.png"
        alt="empty stars"
      />
    )
  };

  const [ratings, setRatings] = useState(config.initialSelectedValue);
  const [description, setDescription] = useState("");

  const saveTheRatings = async () => {
    // send the data to the API deployed at heroku
    const dbURl = "";
    const data = {
      rating: ratings,
      feedback: description
    };
    const options = {
      method: "POST",
      body: data
    };
    await fetch(dbURl, options);
  };

  return (
    <div>
      <StarsRating
        config={config}
        onStarsRated={(value) => {
          alert(`${value} stars rated`);
          setRatings(value);
        }}
        // onSelecting={(isSelecting, selectingValue) => {
        //   console.log(isSelecting, selectingValue);
        // }}
      />
      <textarea
        rows="3"
        placeholder="Give us your feedback"
        onChange={(event) => setDescription(event.target.value)}
      ></textarea>
      <br />
      <button onClick={saveTheRatings}>Submit</button>
    </div>
  );

  // return <StarsRating config={config} />;
}

export default RatingStars;
