import React,{useState, useEffect} from 'react'
import BookCard from '../components/BookCard'
import { CardDeck, Container, Button, Alert} from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;
const ReadingPage = () => {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [hasError, setHasError] = useState(false);
    const [hasNoBook, setHasNoBook] = useState(false);
    const [hasBookRemove, setHasBookRemove] = useState(true);


    useEffect(()=>{
        async function fetchData() {
            setLoading(true);
            try {
              const url = `${BACKEND_API}/favorites`;
              console.log(url);
              const response = await fetch(url);
              const data = await response.json();
              if (response.ok) {
                console.log(data);
                if(data.length === 0){
                  setHasNoBook(true);
                } 
                setFavorites(data);
              } else {
                setErrorMsg(`FETCH FAVORITE BOOKS ERROR: ${data.message}`);
                setHasError(true);
              }
            } catch (error) {
              setErrorMsg(`FETCH FAVORITE BOOKS ERROR: ${error.message}`);
              setHasError(true);
            }
            setLoading(false);
            setHasBookRemove(false)
          };
        if(hasBookRemove){
          fetchData();
        }
  
    },[hasBookRemove])

    const handleRemoveBook = async (id)=>{
      const response = await fetch(`${BACKEND_API}/favorites/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if(response.ok){
        setHasBookRemove(true);
        toast('The book is remove reading list !',{
          type: "success"
        });
      }
      else{
        toast('Some error !',{
          type: "error"
        });
      }
    }


    return (
        <Container>
            <ToastContainer autoClose={2000}/>
            {hasNoBook && (<Alert variant='danger'>
                                No Book in ReadingList
                              </Alert>)}
            {hasError && <h1>{errorMsg}</h1>}
            <CardDeck className="m-3">
                {!loading && (favorites.map(b => (
                  <div>
                    <BookCard title={b.title} author={b.author} key={b.id} id={b.id} img={b.imageLink}/>
                    <Button variant="primary" className="mx-3"onClick={()=>handleRemoveBook(b.id)}>Remove Book from the Reading List</Button>
                  </div>
                )))}
            </CardDeck>
        </Container>
    )
}

export default ReadingPage
