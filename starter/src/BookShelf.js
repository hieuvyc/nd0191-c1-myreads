import "./css/App.css";
import Book from "./Book";

const BookShelf = ({bookShelf,refreshBooks}) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {bookShelf.map((book) => (
                        <li key={book.id}>
                            <Book book={book} refreshBooks={refreshBooks}/>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default BookShelf;