import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

const BookCard = (props) => {
    return (
        <div>
            <Card style={{ width: '18rem' }} className="mb-2" bg="light">
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title><Link to={`/books/${props.id}`} key={props.id}>{props.title}</Link></Card.Title>
                    <Card.Text>{props.author}</Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default BookCard
