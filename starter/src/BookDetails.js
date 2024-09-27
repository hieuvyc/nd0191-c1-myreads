import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import "./css/BookDetails.css";

const BookDetails = () => {
    const { book_id } = useParams();
    const [book, setBook] = useState(null);


    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const fetchedBook = await BooksAPI.get(book_id);
                setBook(fetchedBook);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [book_id]);

    if (!book) {
        return <div>Loading book details...</div>;
    }

    return (
        <div className="book-details">
            <Link to="/">Back to List</Link>
            <h2>{book.title}</h2>
            <p><strong>Author:</strong> {book.authors?.join(', ')}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <div>
                <img
                    src={book.imageLinks?.thumbnail}
                    alt={book.title}
                />
            </div>
        </div>
    );
};

export default BookDetails;
