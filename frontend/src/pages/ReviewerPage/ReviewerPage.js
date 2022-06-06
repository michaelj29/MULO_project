import React, { useState, useEffect } from 'react';
import { Form, Row , Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container'
import axios from 'axios';
import UpdateReview from '../../components/UpdateReview/UpdateReview';
import Modal  from '../../components/Modal/Modal';
import './ReviewerPage.css'
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ReviewerPage = () => {

    const [user, token] = useAuth();
    const [songs, setSongs] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [searchSong, setSearchSong] = useState('');
    const [updateReviewData, setUpdateReviewData] = useState({});
    const [songData, setSongData] = useState({});
    const [show, setShow] = useState(false);



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


    const handleStartUpdateReview = async (review) => {
      setUpdateReviewData(review)
      setShow(true)

      await fetchReviews()
    }
    
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


    const handleSubmitReview = async (song) => {
      setSongData(song);
      await fetchSongs();
    }


    const myReviews = reviews.filter(review => review.user_id === user.id);
    const searchBySongTitle = songs.filter(song => {
       if(song.song_title.toLowerCase() === searchSong.toLowerCase()){
           return true
       } else if (searchSong === ''){
           return song
       }
    });

    useEffect(() => {

        fetchReviews();
      }, [token]);

    useEffect(() => {
        fetchSongs();
      }, [token]);

      
        const deleteReview = async (selectedReview) => {
          try {
            let response = await axios.delete(`http://127.0.0.1:8000/api/mulo/${selectedReview}/`, {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
            console.log(response.data)
          } catch (error) {
            console.log(error.response.data);
          }
        };

        const updateReview = async (editReview, reviewId) => {

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
              <Modal show={show} onClose={() => setShow(false)} >
                <UpdateReview  updateReview={updateReview}  updateReviewData={updateReviewData || {}}/>
                </Modal>
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
            <Card border={'dark'} style={{ width: '27rem', marginBottom: '10px'}}>
                <iframe 
                    title='video'
                    id="ytplayer" 
                    width="430" 
                    height="280"
                    src={`https://www.youtube.com/embed/${song.video_id}?autoplay=1&origin=http://example.com`}
                    frameBorder="0">
                </iframe>
                <Card.Body>
                    <Card.Title>{song.stage_name} - {song.song_title}</Card.Title>
                    <Link to={`/song-review-page/:${song.id}`} style={{ textDecoration: "none", color: "white" }}>
                    <Button  variant='primary'> 
                          REVIEW
                        </Button>
          </Link>
                </Card.Body>
            </Card> 
          </div>
        );
    })}
    </Col>
        <Col className='sort-col'>
        <div >
        {myReviews.map(review => {
            return (
                <div>
                <Card  bg={'warning'} text={'white'} border={'dark'} style={{ width: '20rem', marginBottom: '10px' }}>
                    <Card.Body>
                        <Card.Header>{user.username} </Card.Header>
                        <Card.Title>{`Favorite instrument: ${review.favorite_instrument}`}</Card.Title>
                        <Card.Text className="card-text">
                        {`Rating: ${review.rating}`}
                        </Card.Text>
                        <Card.Text  className="card-text">
                        {`Favorite Lyric: ${review.favorite_lyric}`}
                        </Card.Text>
                        <Card.Text  className="card-text">
                        {`Song Title: ${review.song.song_title}`}
                        </Card.Text>
                        <Card.Text>
                        {`Overview: ${review.overview}`}
                        </Card.Text>
                        <Button variant="danger" onClick={() => {
                            deleteReview(review.id);
                        }}>DELETE</Button>
                        <Button variant='success' onClick={()=> handleStartUpdateReview(review)}>
                          UPDATE
                        </Button>
                    </Card.Body>
                </Card> 
            </div>
            );
        })}
        </div>
        </Col>
    </Row>

        </Container>
    </div>
     );
}
 
export default ReviewerPage;