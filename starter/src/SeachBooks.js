import {useCallback, useState} from "react";
import { Link } from "react-router-dom";
import "./css/App.css";
import * as BooksAPI from "./BooksAPI";
import _ from "lodash";
import * as PropTypes from "prop-types";
import Book from "./Book";

const SearchBooks = ({books, refreshBooks}) => {
    const [searchResult, setSearchResult] = useState([]);
    const [query, setQuery] = useState("");


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
            if (response && response.length > 0) {
                const result = mergeArrays(books, response);
                setSearchResult(result || []);
            } else {
                setSearchResult([]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const debouncedFetchBooks = useCallback(_.debounce(fetchBooks, 1000), []);

    const updateQuery = (query) => {
        setQuery(query);
        if (query.trim() === "") {
            setSearchResult([]);
            debouncedFetchBooks.cancel();
        } else {
            debouncedFetchBooks(query);
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
                            <Book book={book} refreshBooks={refreshBooks}/>
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