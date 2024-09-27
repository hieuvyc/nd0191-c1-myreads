import "./css/App.css";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListBooks from "./ListBooks"
import SearchBooks from "./SeachBooks";
import * as BooksAPI from "./BooksAPI";
import NotFound from "./NotFound";
import BookDetails from "./BookDetails";

const App = () => {

    const [books, setBooks] = useState([]);
    const getBooks = async () => {
        const response = await BooksAPI.getAll();
        setBooks(response);
    };

    useEffect(() => {
        getBooks();
    }, []);

  return(
      <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
            exact
            path="/"
            element={
              <ListBooks books={books} refreshBooks={getBooks}/>
            }
        />
          <Route
              path="/search"
              element={
                  <SearchBooks books={books} refreshBooks={getBooks}/>
              }
          />
          <Route
              path="/books/:book_id"
              element={
                <BookDetails />} />
      </Routes>
      </BrowserRouter>
  );
};

export default App;
