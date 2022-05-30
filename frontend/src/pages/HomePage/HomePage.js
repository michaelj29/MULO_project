import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import Card from 'react-bootstrap/Card'
import './HomePage.css'

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
    <div className="card-container">
      {reviews &&
        reviews.map((review) => (
          <p key={review.id}>
              <div>
                <Card className="card" bg={'warning'} text={'white'} border={'dark'}style={{ width: '20rem' }}>
                    <Card.Body>
                      <Card.Header>City: {review.city} || Rating: {review.rating} </Card.Header>
                        <Card.Text>
                        Song title : {review.song.song_title}
                        </Card.Text>
                        <Card.Text>
                        Overview: {review.overview}
                        </Card.Text>
                    </Card.Body>
                </Card> 
              </div>
          </p>
        ))}
    </div>
  );
};

export default HomePage;
