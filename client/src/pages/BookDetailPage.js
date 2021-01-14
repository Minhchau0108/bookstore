import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
    const { id } = useParams();
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
    const handleFavorite = async (book)=>{
      const response = await fetch(`${BACKEND_API}/favorites`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(book),
      })
      if(response.ok){
        toast('The book is added to reading list !',{
          type: "success"
        });
      }
      else{
        toast('Cannot add the same id book !',{
          type: "error"
        });
      }
    }
    return (
        <Container>
            <ToastContainer autoClose={2000}/>
            {hasError && <h1>{errorMsg}</h1>}
             {!loading &&(
               <>
                <Card className="m-2 p-3">
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
                        <Button variant="primary" onClick={()=>handleFavorite(book)}>Add to Reading</Button>
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
