import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/App.css";
import * as BooksAPI from "./BooksAPI";

const ListBooks = ({books, refreshBooks}) => {
    const handleRefresh = () => {
        refreshBooks(); // This will call the API again and update the list
    };
    const [selectedShelf, setSelectedShelf] = useState({});
    // console.log("books", books);
    let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead = books.filter(book => book.shelf === 'wantToRead');
    let readBooks = books.filter(book => book.shelf === 'read');

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
        <div className="app">
                <div className="list-books">
                    <div className="list-books-title">
                        <h1>MyReads</h1>
                    </div>
                    <div className="list-books-content">
                        <div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Currently Reading</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    {currentlyReading.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div
                                                        className="book-cover"
                                                        style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage:
                                                                `url(${book.imageLinks.thumbnail})`,
                                                        }}
                                                    ></div>
                                                    <div className="book-shelf-changer">
                                                        <select value={selectedShelf[book.id] || book.shelf}
                                                                onChange={(event) => handleShelfChange(event, book.id)}>
                                                            <option value="none" disabled>
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
                                        </li>
                                    ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Want to Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    {wantToRead.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div
                                                        className="book-cover"
                                                        style={{
                                                            width: 128,
                                                            height: 193,
                                                            backgroundImage:
                                                                `url(${book.imageLinks.thumbnail})`,
                                                        }}
                                                    ></div>
                                                    <div className="book-shelf-changer">
                                                        <select value={selectedShelf[book.id] || book.shelf}
                                                                onChange={(event) => handleShelfChange(event, book.id)}>
                                                            <option value="none" disabled>
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
                                        </li>
                                    ))}
                                    </ol>
                                </div>
                            </div>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">Read</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                    {readBooks.map((book) => (
                                        <li key={book.id}>
                                            <div className="book">
                                                <div className="book-top">
                                                    <div
                                                        className="book-cover"
                                                        style={{
                                                            width: 128,
                                                            height: 192,
                                                            backgroundImage:
                                                                `url(${book.imageLinks.thumbnail})`,
                                                        }}
                                                    ></div>
                                                    <div className="book-shelf-changer">
                                                        <select value={selectedShelf[book.id] || book.shelf}
                                                                onChange={(event) => handleShelfChange(event, book.id)}>
                                                            <option value="none" disabled>
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
                                        </li>
                                    ))}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="open-search">
                        <Link to="/search">Add a book</Link>
                    </div>
                </div>
        </div>
    );
}

ListBooks.propTypes = {
    books: PropTypes.array.isRequired,
};

export default ListBooks;