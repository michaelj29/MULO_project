import React, { useState } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddReview = ({postReview}) => {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [favoriteLyric, setFavoriteLyric] = useState('');
    const [favoriteInstrument, setFavoriteInstrument] = useState('');
    const [rating, setRating] = useState('');
    const [overview, setOverview] = useState('');
    const [songId, setSongId] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        let newReview = {
            city : city,
            state: state,
            favorite_lyric: favoriteLyric,
            favorite_instrument: favoriteInstrument,
            rating: rating,
            overview: overview,
            song_id: songId
        }
        postReview(newReview)
    };

    return ( 
        <div> 
            <div className='fixed-bottom'>
                <Card body bg={'secondary'}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                            <Form.Control placeholder="City" onChange={(event) => setCity(event.target.value)} value={city}/>
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
                            <Col>
                            <Form.Control placeholder="Song Id" onChange={(event) => setSongId(event.target.value)} value={songId}/>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit">SUBMIT</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
     );
}
 
export default AddReview;