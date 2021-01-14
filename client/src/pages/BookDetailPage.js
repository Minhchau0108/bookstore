import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from 'react-bootstrap';


const BookDetailPage = () => {
    const { id } = useParams();
    const BACKEND_API = process.env.REACT_APP_BACKEND_API;
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [hasError, setHasError] = useState(false);
    const [book, setBook] = useState({});

    useEffect(() => {
        if(!id) {
            return;
        }
        async function fetchData() {
          setLoading(true);
          try {
            let url = `${BACKEND_API}/books/${id}`;
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            setBook(data);
          } catch (error) {
            setErrorMsg(`FETCH BOOK ERROR: ${error.message}`);
            setHasError(true);
          }
          setLoading(false);
        };
        fetchData();
      }, [id]);
    
    return (
        <Container>
            {hasError && <h1>{errorMsg}</h1>}
             {!loading &&(
               <>
                <Card className="m-2">
                  <Row>
                    <Col>             
                      <Card.Img variant="top" src={`${BACKEND_API}/${book.imageLink}`} />
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title>{book.title}</Card.Title>
                        <Card.Text>Author: {book.author}</Card.Text>
                        <Card.Text>Year: {book.year}</Card.Text>
                        <Card.Text>Country: {book.country}</Card.Text>
                        <Card.Text>Pages: {book.pages}</Card.Text>
                        <Button variant="primary">Add to Reading</Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
                </>
            )}
        </Container>
    )
}

export default BookDetailPage
