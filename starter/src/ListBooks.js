import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./css/App.css";
import Book from "./Book";
import BookShelf from "./BookShelf";

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
                            <BookShelf bookShelf={currentlyReading} refreshBooks={refreshBooks}/>
                            <BookShelf bookShelf={wantToRead} refreshBooks={refreshBooks}/>
                            <BookShelf bookShelf={readBooks} refreshBooks={refreshBooks}/>
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