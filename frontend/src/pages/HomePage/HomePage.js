import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/mulo/all-reviews/", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setReviews(response.data);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchReviews();
  }, [token]);
  return (
    <div className="container">
      <h1>Home Page for {user.username}!</h1>
      {reviews &&
        reviews.map((review) => (
          <p key={review.id}>
             {review.city} {review.state} {review.favorite_lyrics} 
             {review.favorite_instrument} 
             {review.rating} {review.overview}

          </p>
        )).reverse()}
    </div>
  );
};

export default HomePage;
