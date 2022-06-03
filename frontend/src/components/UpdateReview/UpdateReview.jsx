import React, { useState, useEffect } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateReview = ({updateReview, updateReviewData}) => {
    const [city, setCity] = useState(() => updateReviewData.city);
    const [state, setState] = useState(() => updateReviewData.state);
    const [favoriteLyric, setFavoriteLyric] = useState(() =>   updateReviewData.favorite_lyric);
    const [favoriteInstrument, setFavoriteInstrument] = useState(() => updateReviewData.favorite_instrument);
    const [rating, setRating] = useState(() => updateReviewData.rating);
    const [overview, setOverview] = useState(() => updateReviewData.overview);


    function handleSubmit(event){
        event.preventDefault();

        let editReview = {
            city : city,
            state: state,
            favorite_lyric: favoriteLyric,
            favorite_instrument: favoriteInstrument,
            rating: rating,
            overview: overview,
            song_id: updateReviewData.song.id
        }

        updateReview(editReview, updateReviewData.id);
    };

    return ( 
        <div> 
            <div >
                <Card body>
                    <Form onSubmit={handleSubmit}>
                        <Col>
                            
                            <Col>
                            <Form.Control  placeholder="City" onChange={(event) => setCity(event.target.value)} value={city}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="State" onChange={(event) => setState(event.target.value)} value={state}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Favorite lyrics" onChange={(event) => setFavoriteLyric(event.target.value)} value={favoriteLyric}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Favorite Instrument" onChange={(event) => setFavoriteInstrument(event.target.value)} value={favoriteInstrument}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="1 - 5" onChange={(event) => setRating(event.target.value)} value={rating}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Overall thoughts" onChange={(event) => setOverview(event.target.value)} value={overview}/>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button variant="warning" type="submit">UPDATE</Button>
                            </Col>
                        </Col>
                    </Form>
                </Card>
            </div>
        </div>
     );
}
 
export default UpdateReview;