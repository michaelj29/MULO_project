import React, { useState, useEffect } from 'react';
import AddSong from '../../components/AddSong/AddSong';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import useAuth from "../../hooks/useAuth";


const ArtistPage = () => {

    const [user, token] = useAuth();

    
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

    return ( 
        <div>
            <h3>Artist Page </h3>
            <AddSong fixed="bottom" postSong={postSong} /> 
        </div>
     );
}
 
export default ArtistPage;