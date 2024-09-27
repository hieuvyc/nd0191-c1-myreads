import { useState } from "react";
import PropTypes from "prop-types";
import "./css/App.css";
import * as BooksAPI from "./BooksAPI";
import {Link} from "react-router-dom";


const Book = ({book, refreshBooks})=> {

    const [selectedShelf, setSelectedShelf] = useState({});
    const handleRefresh = () => {
        refreshBooks(); // This will call the API again and update the list
    };
    // Handle the select change
    const handleShelfChange = async (event, bookId) => {
        const newShelf = event.target.value;

        setSelectedShelf((prev) => ({
            ...prev,
            [bookId]: newShelf,
        }));
        try {
            const response = await BooksAPI.update({id: bookId}, newShelf);
            handleRefresh();
            console.log('Book updated successfully', response);
        } catch (error) {
            console.error('Error updating the book shelf:', error);
        }
    };
    return (
        <div className="book">
            <div className="book-top">
                <Link to={`/books/${book.id}`}>
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 193,
                        backgroundImage:
                            `url(${book.imageLinks?.thumbnail})`,
                    }}
                ></div>
                </Link>
                <div className="book-shelf-changer">
                    <select value={selectedShelf[book.id] || book.shelf || "none"}
                            onChange={(event) => handleShelfChange(event, book.id)}>
                        <option value="moveTo" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors ? book.authors.join(", ") : "Unknown Author"}</div>
        </div>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
};

export default Book;