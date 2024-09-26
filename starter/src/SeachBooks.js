import {useCallback, useState} from "react";
import { Link } from "react-router-dom";
import "./css/App.css";
import * as BooksAPI from "./BooksAPI";
import _ from "lodash";
import * as PropTypes from "prop-types";

const SearchBooks = ({books, refreshBooks}) => {
    //console.log("books on search book", books);
    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");
    const [selectedShelf, setSelectedShelf] = useState({});

    // Function to merge current book shelf with search result
    const mergeArrays = (arrayA, arrayB) => {
        return arrayB.map(itemB => {
            // Find the corresponding item in arrayA by matching ids
            const matchInArrayA = arrayA.find(itemA => itemA.id === itemB.id);

            // If there's a match, add the shelf from arrayA to the item from arrayB
            if (matchInArrayA) {
                return { ...itemB, shelf: matchInArrayA.shelf };
            }

            // If no match, return the original item from arrayB (without shelf)
            return itemB;
        });
    };

    const fetchBooks = async (query) => {
        try {
            const response = await BooksAPI.search(query);
            const result = mergeArrays(books, response);
            setSearchResult(result || []);
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedFetchBooks = useCallback(_.debounce(fetchBooks, 1000), []);

    const updateQuery = (query) => {
        setQuery(query);
        if (query.trim() !== "") {
            debouncedFetchBooks(query);
        } else {
            setSearchResult([]);
        }
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
            console.log('Book updated successfully', response);
        } catch (error) {
            console.error('Error updating the book shelf:', error);
        }
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    to="/"
                    onClick={() => {
                        refreshBooks();
                    }}
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        value={query}
                        onChange={(event) => updateQuery(event.target.value)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {searchResult.length > 0 && searchResult?.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div
                                        className="book-cover"
                                        style={{
                                            width: 128,
                                            height: 193,
                                            backgroundImage:
                                                `url(${book.imageLinks?.thumbnail})`,
                                        }}
                                    ></div>
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
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

SearchBooks.propTypes = {
    books: PropTypes.array.isRequired,
};

export default SearchBooks;