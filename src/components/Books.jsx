import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql'; // Adjust the path if necessary
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [selectedBook, setSelectedBook] = useState(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Books</h2>
      <ul>
        {data.findAllBooks.map((book) => (
          <li key={book.id}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <p>Author: {book.author.name}</p>
            <button onClick={() => setSelectedBook(book)}>Update</button>
            <DeleteBook bookId={book.id} />
          </li>
        ))}
      </ul>
      {selectedBook && (
        <div>
          <h3>Update Book</h3>
          <UpdateBook book={selectedBook} />
        </div>
      )}
      <p>Total Books: {data.countBooks}</p>
    </div>
  );
};

export default Books;
