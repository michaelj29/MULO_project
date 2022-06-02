import React from "react";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import './HomePage.css'
import { Form, Col,  Card} from 'react-bootstrap';

import axios from "axios";

const HomePage = () => {
  // The "user" value from this Hook contains the decoded logged in user information (username, first name, id)
  // The "token" value is the JWT token that you will send in the header of any request requiring authentication
  //TODO: Add an AddCars Page to add a car for a logged in user's garage
  const [user, token] = useAuth();
  const [reviews, setReviews] = useState([]);
  const [searchSong, setSearchSong] = useState('');

  const searchReviewBySongTitle = reviews.filter(song => {
    if(song.song.song_title.toLowerCase() === searchSong.toLowerCase()){
        return true
    } else if (searchSong === ''){
        return song
    }
 })

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
      <div>
          <Form onChange={(event) => setSearchSong(event.target.value)}>
              <Col>
                  <Form.Control placeholder="search a song by title" />
              </Col>
          </Form>
      </div>
      {searchReviewBySongTitle.map((reviews) => (
          <p key={reviews.id}>
              <div>
                <Card className="card" bg={'warning'} text={'white'} border={'dark'} style={{ width: '20rem' }}>
                    <Card.Body>
                    <Card.Header>{reviews.user.username}</Card.Header>
                        <Card.Title>{`Favorite instrument: ${reviews.favorite_instrument}`}</Card.Title>
                        <Card.Text className="card-text">
                        {`Rating: ${reviews.rating}`}
                        </Card.Text>
                        <Card.Text  className="card-text">
                        {`Favorite Lyric: ${reviews.favorite_lyric}`}
                        </Card.Text>
                        <Card.Text  className="card-text">
                        {`Song Title: ${reviews.song.song_title}`}
                        </Card.Text>
                        <Card.Text>
                        {`Overview: ${reviews.overview}`}
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
