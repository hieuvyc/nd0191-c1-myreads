How to start the application
- Install all project dependencies with `npm install`
- Start the development server with `npm start`

Project description:
This app can be useful for readers who want to keep track of their reading progress and manage their personal book collection. It also provides a simple way to discover new books through the search feature.

App Functionality:
- Search and Add Books: Users can search for books using the search screen. The app likely queries an API to fetch books based on the search term (title, author, ISBN). The user can then select books from the search results and add them to one of the shelves (Currently Reading, Want to Read, Read).
- Move Between Shelves: On the main screen (MyReads), the user can organize their books by moving them between shelves using the drop-down control on each book.

Book Page
1.Bookshelves (MyReads):
    -The main screen is titled "MyReads" and contains three shelves:
        Currently Reading: Shows the books that the user is currently reading.
        Want to Read: Shows the books that the user wants to read in the future.
        Read: Lists the books that the user has already completed reading.
    -Each book is displayed with its title, author(s), and cover image.
    -A drop-down control (green circle with a down arrow) is provided for each book, which allows the user to move the book to a different shelf or remove it from a shelf.

2.Floating Action Button (FAB):
    -A green "+" button is visible at the bottom-right corner of the main screen. This button likely provides a way to add new books or search for books to add to the list.

Search Page
    -The second screenshot shows the search page where users can search for books by title, author, or ISBN.
    -The search input is at the top, allowing the user to type queries to search for books.
    -Once a query is entered, the results (books matching the search term) should be displayed below the input box.