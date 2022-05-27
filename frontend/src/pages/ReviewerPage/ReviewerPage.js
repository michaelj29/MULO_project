import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";
import AddReview from '../../components/AddReview/AddReview';


const ReviewerPage = () => {

    const [user, token] = useAuth();
    const [songs, setSongs] = useState([])

    
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
    return ( 
        <div>
            <h3>Reviewer Page </h3>
            {songs.map(song => {
        return (
          <div>
            <Card style={{ width: '18rem' }}>
                <iframe 
                    id="ytplayer" 
                    title="MyPlayer"
                    type="text/html" 
                    width="286" 
                    height="180"
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
            <AddReview fixed="bottom" postReview={postReview}/>
        </div>
     );
}
 
export default ReviewerPage;