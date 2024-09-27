import "./css/App.css";
import Book from "./Book";

const BookShelf = ({bookShelf,refreshBooks}) => {
    console.log('bookShelf', bookShelf);
    const shelf = (item)=> {
        switch(item) {
            case 'currentlyReading':
                return 'Currently Reading';
            case 'wantToRead':
                return 'Want To Read';
            default:
                return 'Read';
        }
    }
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf(bookShelf[0]?.shelf)}</h2>
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