import React, { useState, useEffect } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSong from '../../components/AddSong/AddSong';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


const ArtistPage = () => {

    const [user, token] = useAuth();
    const [reviews, setReviews] = useState([]);
    const [searchCity, setSearchCity] = useState("");


    
    
    const getUsersReviews = reviews.filter(review => review.song.user === user.id);
    const getLengthOfReviews = getUsersReviews.length * 5;
    const getSumOfRatings = getUsersReviews.reduce((a, b) => a + b.rating, 0);
    const overallRating = Math.round((getSumOfRatings / getLengthOfReviews) * 100);
    const orderRatingsHighToLowByRating = getUsersReviews.sort((a, b) => a.rating - b.rating).reverse();
    const orderRatingsHighToLowByCity = getUsersReviews.sort((a, b) => {
        const nameA = a.city.toUpperCase();
        const nameB = b.city.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    const getReviewsByCity = getUsersReviews.filter(review => review.city.toLowerCase() === searchCity.toLowerCase()) 
    const getLengthOfCityReviews = getReviewsByCity.length * 5;
    const getSumOfCityReviews = getReviewsByCity.reduce((a, b) => a + b.rating, 0);
    const overallCityRating = Math.round((getSumOfCityReviews / getLengthOfCityReviews) * 100)

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
    
    async function postSong(newSong){
    try {
        let response = await axios.post('http://127.0.0.1:8000/api/mulo/', newSong, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
    } catch (err) {
        console.log('Error in postSong function in ArtistPage.js file')
        
    }
    };


console.log(getReviewsByCity)
console.log(overallCityRating)


    return ( 
        <div>
            <h3>Artist Page </h3>
            <div>
                <h1>
                    {`Hi ${user.username} your overall rating score is ${overallRating}%`}
                </h1>
            </div>
            <div>
                <Form onChange={(event) => setSearchCity(event.target.value)}>
                    <Col>
                        <Form.Control placeholder="Type in a city to see ratings" />
                    </Col>
                </Form>
            </div>
            <div>
                <h3>
                    {`Your overall rating score for this city is  ${overallCityRating || 0}% and there are ${getLengthOfCityReviews/5 || 'currently no'} reviews from this city`}
                </h3>
            </div>
            <AddSong fixed="bottom" postSong={postSong} /> 
        </div>
     );
}
 
export default ArtistPage;