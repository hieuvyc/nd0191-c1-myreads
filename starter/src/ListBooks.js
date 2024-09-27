import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/App.css";
import Book from "./Book";

const ListBooks = ({books, refreshBooks}) => {

    let currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    let wantToRead = books.filter(book => book.shelf === 'wantToRead');
    let readBooks = books.filter(book => book.shelf === 'read');

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
                                            <Book book={book} refreshBooks={refreshBooks}/>
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
                                            <Book book={book} refreshBooks={refreshBooks}/>
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
                                            <Book book={book} refreshBooks={refreshBooks}/>
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