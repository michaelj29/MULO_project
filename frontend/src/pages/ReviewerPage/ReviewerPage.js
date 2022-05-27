import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import AddReview from '../../components/AddReview/AddReview';


const ReviewerPage = () => {

    const [user, token] = useAuth();
    const [songs, setSongs] = useState([]);
    const [reviews, setReviews] = useState([]);

    const myReviews = reviews.filter(review => review.user_id === user.id);

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
    return ( 
        <div>
            <h3>Reviewer Page  {user.id}</h3>
            {songs.map(song => {
        return (
          <div>
            <Card style={{ width: '40rem' }}>
                <iframe 
                    id="ytplayer" 
                    title="MyPlayer"
                    type="text/html" 
                    width="638" 
                    height="380"
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

      <div>
      {myReviews.map(reviews => {
        return (
          <div>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <Card.Title>{user.username} - - - {user.id}</Card.Title>
                    <Card.Text>
                    {`Rating: ${reviews.rating}    ${reviews.id}  Favorite Lyric: ${reviews.favorite_lyric}`}
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
            <AddReview fixed="bottom" postReview={postReview}/>
        </div>
     );
}
 
export default ReviewerPage;