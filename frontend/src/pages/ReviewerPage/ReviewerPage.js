import React, { useState, useEffect } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import AddReview from '../../components/AddReview/AddReview';
import UpdateReview from '../../components/UpdateReview/UpdateReview';
import './ReviewerPage.css'

const ReviewerPage = () => {

    const [user, token] = useAuth();
    const [songs, setSongs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [reviewId, setReviewId] = useState('');
    const [searchSong, setSearchSong] = useState('');

    const myReviews = reviews.filter(review => review.user_id === user.id);
    const searchBySongTitle = songs.filter(song => {
       if(song.song_title.toLowerCase() === searchSong.toLocaleLowerCase()){
           return true
       } else if (searchSong === ''){
           return song
       }
    })

    async function postReview(newReview){
    try {
        let response = await axios.post('http://127.0.0.1:8000/api/mulo/create/', newReview, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
    } catch (err) {
        console.log('Error in postReview function in ReviewerPage.js file')
        
    }
    };

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

    useEffect(() => {
        const fetchSongs = async () => {
          try {
            let response = await axios.get("http://127.0.0.1:8000/api/mulo/all-songs/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            setSongs(response.data);
          } catch (error) {
            console.log(error.response.data);
          }
        };
        fetchSongs();
      }, [token]);

      
        const deleteReview = async (selectedReview) => {
          try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/mulo/${selectedReview}/`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
          } catch (error) {
            console.log(error.response.data);
          }
        };

        const updateReview = async (editReview) => {

            try {
              let response = await axios.put(`http://127.0.0.1:8000/api/mulo/${reviewId}/`, editReview, {
                 
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              console.log(response.data)
            } catch (error) {
              console.log(error.response.data);
            }
          };

    return ( 
        <div className='container'>
            <div className='fixed-top'>
                <UpdateReview  updateReview={updateReview} setReviewId={setReviewId} />
            </div>
            <Container className='columns'>
            <Row className="row" xl>
                <Col>
                    <div>
                        <Form onChange={(event) => setSearchSong(event.target.value)}>
                            <Col>
                                <Form.Control placeholder="search a song by title" />
                            </Col>
                        </Form>
                    </div>
                </Col>
            <Col className='videos'>
            {searchBySongTitle.map(song => {
                return (
                    <div>
            <Card style={{ width: '27rem' }}>
                <iframe 
                    id="ytplayer" 
                    title="MyPlayer"
                    type="text/html" 
                    width="430" 
                    height="280"
                    src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&origin=http://example.com`}
                    frameBorder="0">
                </iframe>
                <Card.Body>
                    <Card.Title>{song.stage_name} - {song.song_title}</Card.Title>
                    <Card.Text>
                    {`SongID: ${song.id}\n Genre: ${song.genre}\n Year: ${song.year}`}
                    </Card.Text>
                </Card.Body>
            </Card> 
          </div>
        );
    })}
    </Col>
        <Col className='reviews'>
        <div >
        {myReviews.map(reviews => {
            return (
                <div>
                <Card  bg={'warning'} text={'white'} border={'dark'}style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Header>{user.username}  || Review ID: {reviews.id} </Card.Header>
                        <Card.Title>{`Favorite instrument: ${reviews.favorite_instrument}`}</Card.Title>
                        <Card.Text>
                        {`Rating: ${reviews.rating}`}
                        </Card.Text>
                        <Card.Text>
                        {`Favorite Lyric: ${reviews.favorite_lyric}`}
                        </Card.Text>
                        <Card.Text>
                        {`SongID: ${reviews.song.id}`}
                        </Card.Text>
                        <Card.Text>
                        {`${reviews.overview}`}
                        </Card.Text>
                        <Button variant="danger" onClick={() => {
                            deleteReview(reviews.id);
                        }}>DELETE</Button>
                    </Card.Body>
                </Card> 
            </div>
            );
        })}
        </div>
        </Col>
    </Row>
            <div>
                <AddReview fixed="bottom" postReview={postReview}/>
            </div>
        </Container>
    </div>
     );
}
 
export default ReviewerPage;