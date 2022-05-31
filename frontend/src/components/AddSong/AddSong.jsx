import React, { useState } from 'react';
import { Form, Row , Col, Button, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AddSong = ({postSong}) => {

    const [stageName, setStageName] = useState('');
    const [songTitle, setSongTitle] = useState('');
    const [videoId, setVideoId] = useState('');
    const [genre, setGenre] = useState('');
    const [year, setYear] = useState('');

    function handleSubmit(event){
        event.preventDefault();
        let newSong = {
            stage_name : stageName,
            song_title: songTitle,
            video_id: videoId,
            genre: genre,
            year: year
        }
        postSong(newSong)
    };

    return ( 
        <div> 
            <div className='fixed-bottom'>
                <Card body bg={'secondary'}>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col>
                            <Form.Control placeholder="Stage Name" onChange={(event) => setStageName(event.target.value)} value={stageName}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Song Title" onChange={(event) => setSongTitle(event.target.value)} value={songTitle}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Video Id from Youtube" onChange={(event) => setVideoId(event.target.value)} value={videoId}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="Genre" onChange={(event) => setGenre(event.target.value)} value={genre}/>
                            </Col>
                            <Col>
                            <Form.Control placeholder="2022" onChange={(event) => setYear(event.target.value)} value={year}/>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>
        </div>
     );
}
 
export default AddSong;