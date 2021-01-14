import React,{useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import PaginationBar from '../components/PaginationBar';
import BookCard from '../components/BookCard'
import { CardDeck, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const HomePage = () => {
    const totalPageNum = 10;
    const limit = 10;
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const [errorMsg, setErrorMsg] = useState('');
    const [hasError, setHasError] = useState(false);

    const[searchInput, setSearchInput] = useState('');
    const[query, setQuery] = useState('');

    const history = useHistory();

    useEffect(() => {
        async function fetchData() {
          setLoading(true);
          try {
            let url = `${BACKEND_API}/books?_page=${pageNum}&_limit=${limit}`;
            if (query) {
                url += `&q=${query}`;
            } 
            console.log(url);
            const response = await fetch(url);
            const data = await response.json();
            if (response.ok) {
              console.log(data);
              setBooks(data);
            } else {
              setErrorMsg(`FETCH BOOKS ERROR: ${data.message}`);
              setHasError(true);
            }
          } catch (error) {
            setErrorMsg(`FETCH BOOKS ERROR: ${error.message}`);
            setHasError(true);
          }
          setLoading(false);
        };
        fetchData();
      }, [pageNum,query]);
    


    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    }
    const handleSearchFormSubmit = (event) => {
        event.preventDefault();
        setQuery(searchInput);
        setPageNum(1);
        history.push({search: `?q=${searchInput}`})

    };
    const handlePageClick=(page)=>{
        console.log('handlepageclick');
        setPageNum(page.selected+1);
    }
    return (
        <Container>
            <form onSubmit={handleSearchFormSubmit} className="form-inline d-flex justify-content-center my-3">
                <div>
                    <input type="text" onChange={handleSearchInputChange} value={searchInput} className="form-control"/>
                    <input type="submit" value="Search" className="btn btn-primary mx-2" />
                </div>
            </form>
            <PaginationBar pageCount={totalPageNum} handlePageClick={handlePageClick} forcePage={pageNum-1}/>
            {hasError && <h1>{errorMsg}</h1>}
            <CardDeck>
                {!loading && (books.map(b => <BookCard title={b.title} author={b.author} key={b.id} id={b.id} img={b.imageLink}/>))}
            </CardDeck>
        </Container>
    )
}

export default HomePage
