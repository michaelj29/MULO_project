import React, { useState, useEffect } from 'react';
import useAuth from "../../hooks/useAuth";
import AddReview from '../../components/AddReview/AddReview';
import { useParams} from "react-router-dom";
import axios from 'axios';
import { Card } from 'react-bootstrap';


const SongReviewPage = () => {

    const [user, token] = useAuth();
    const [song, setSong] = useState([]);
    const {songId} = useParams();

    const idNumber = songId.split('');
    const songInfo = song[0];

    useEffect(() => {
        const fetchSongs = async () => {
          try {
            let response = await axios.get("http://127.0.0.1:8000/api/mulo/all-songs/", {
              headers: {
                Authorization: "Bearer " + token,
              },
            });
           const songBeingReviewed = response.data.filter(reviewSong => reviewSong.id === parseInt(idNumber[1]));
           console.log(response.data)
            setSong(songBeingReviewed);
          } catch (error) {
            console.log(error.response.data);
          }
        };
        fetchSongs();

      }, [token]);


    async function postReview(newReview){
        try {
            let response = await axios.post('http://127.0.0.1:8000/api/mulo/create/', newReview, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              console.log(response.data)
        } catch (err) {
            console.log('Error in postReview function in SongReviewPage.js file')
        }
        };

        console.log(songInfo, idNumber[1])
        

  return (
    <div>
 {song.filter(reviewSong => reviewSong.id === parseInt(idNumber[1])).map(song => {
                return (
                    <div>
            <Card border={'dark'} style={{ width: '27rem', marginLeft: '35%'}}>
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
                </Card.Body>
            </Card> 
          </div>
        );
    })}
            <div>
                <AddReview fixed="bottom" postReview={postReview} song={song}/>
            </div>
    </div>
  )
}

export default SongReviewPage