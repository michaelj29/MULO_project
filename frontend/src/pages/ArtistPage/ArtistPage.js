import React, { useState, useEffect } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddSong from '../../components/AddSong/AddSong';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import './ArtistPage.css'




const ArtistPage = () => {

    const [user, token] = useAuth();
    const [reviews, setReviews] = useState([]);
    const [searchCity, setSearchCity] = useState("");
    const [userReviews, setUserReviews] = useState([]);
    const [listOrder, setListOrder] = useState("");


    useEffect(() => {
        switch(listOrder){
            case "rate":
                 orderHighToLowByRating.reverse();
                // setListOrder("")
                setUserReviews([...getUsersReviews].sort((acc, b) => b.rating - acc.rating))
                break;
            case "city":
                // orderHighToLowByCity.reverse();
                // setListOrder("")
                setUserReviews([...getUsersReviews].sort((a, b) => {
                    const nameA = a.city.toUpperCase();
                    const nameB = b.city.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                }))
                break;
            case "rate reverse":
                 orderHighToLowByRating.reverse();
                // setListOrder("")
                setUserReviews([...getUsersReviews].sort((acc, b) => acc.rating - b.rating ))
                break;
            case "city reverse":
                // orderHighToLowByCity.reverse();
                // setListOrder("")
                setUserReviews([...getUsersReviews].sort((a, b) => {
                    const nameA = a.city.toUpperCase();
                    const nameB = b.city.toUpperCase();
                    if (nameB < nameA) {
                        return -1;
                    }
                    if (nameB > nameA) {
                        return 1;
                    }
                    return 0;
                }))
                break;
                default:
                    setUserReviews([...getUsersReviews].sort((acc, b) => b.rating - acc.rating))
                    break;

        }
    }, [listOrder])

    const getUsersReviews = reviews.filter(review => review.song.user === user.id);
    const getLengthOfReviews = getUsersReviews.length * 5;
    const getSumOfRatings = getUsersReviews.reduce((a, b) => a + b.rating, 0);
    const overallRating = Math.round((getSumOfRatings / getLengthOfReviews) * 100);
    const getReviewsByCity = getUsersReviews.filter(review => review.city.toLowerCase() === searchCity.toLowerCase()) 
    const getLengthOfCityReviews = getReviewsByCity.length * 5;
    const getSumOfCityReviews = getReviewsByCity.reduce((a, b) => a + b.rating, 0);
    const overallCityRating = Math.round((getSumOfCityReviews / getLengthOfCityReviews) * 100);
    const orderHighToLowByRating = [...getUsersReviews].sort((acc, b) => b.rating - acc.rating);

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

    // const {isLoaded} = useLoadScript({
    //     googleMapsApiKey: 'AIzaSyAW1fuC69NgMCjeqUvNeOFKy4OxX85F4FA',
    // });

    // if(!isLoaded) <div>Loaded. . . .</div>;
        
    // return <Map />;

    // function Map(){
    //     return <GoogleMap zoom={10} center={{lat: 44, lng: -80}  }></GoogleMap>
    // }

    return ( 
        <div>
            <Container>
            <Row>
            <Col>
            <div>
                <h4>
                    {`Hi ${user.username}, your overall rating score is ${overallRating || 0}%!`}
                </h4>
            </div>
            <div>
                <Form onChange={(event) => setSearchCity(event.target.value)}>
                    <Col>
                        <Form.Control placeholder="Type in a city to see ratings in that area." />
                    </Col>
                </Form>
            </div>
            <div>
                <p>
                    {`Your overall rating score for this city is  ${overallCityRating || 0}% and, there are ${getLengthOfCityReviews/5 || 'currently no'} reviews from this city.`}
                </p>
            </div>
            <div>
                {overallCityRating >= 70? (
                        <p className='legend'>The red markers on the map indicate suggested venues
                        <iframe 
                                className='i-frame'
                                width="600" 
                                height="400" 
                                id="gmap_canvas" 
                                src={`https://maps.google.com/maps?q=venue%20in%20${searchCity}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                                frameborder="0" 
                                scrolling="yes" 
                                marginheight="0" 
                                marginwidth="0">
                        </iframe></p>) : (
                            <p>Your ratings needs to be 70% or higher to view suggested venues</p>
                        )}
            </div>
            </Col>
            <Col className='sort-col'>
            <div className="sort-btn">
                <Button  size="lg" variant="success" onClick={() =>{
                    setListOrder('city')}}>CITY A-Z
                </Button>
                <Button  size="lg" variant="success" onClick={() =>{
                    setListOrder('city reverse')}}>CITY Z-A
                </Button>
                <Button  size="lg" variant="success" onClick={() =>{
                    setListOrder('rate')}}>RATING 5-1
                </Button>
                <Button  size="lg" variant="success" onClick={() =>{
                    setListOrder('rate reverse')}}>RATING 1-5
                </Button>
            </div>
            {userReviews.map(reviews => {
                return (
                    <div className='sort-card'>
                    <Card bg={'warning'} text={'white'} border={'dark'}style={{ width: '20rem'}}>
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
                );
            })}
            </Col>
            </Row>
            </Container>
            <AddSong fixed="bottom" postSong={postSong} /> 
        </div>
     );
}
 
export default ArtistPage;