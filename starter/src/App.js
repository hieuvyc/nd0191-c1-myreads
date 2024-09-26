import "./css/App.css";
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ListBooks from "./ListBooks"
import SearchBooks from "./SeachBooks";
import * as BooksAPI from "./BooksAPI";

const App = () => {

    const [books, setBooks] = useState([]);
    const getBooks = async () => {
        const res = await BooksAPI.getAll();
        setBooks(res);
    };

    useEffect(() => {
        getBooks();
    }, []);

  return(
      <BrowserRouter>
      <Routes>
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
      </Routes>
      </BrowserRouter>
  );
};

export default App;
