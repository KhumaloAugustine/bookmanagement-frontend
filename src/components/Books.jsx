import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOKS } from '../graphql';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';

const Books = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOKS);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    setShowUpdateForm(true);
  };

  const handleUpdateComplete = () => {
    refetch(); 
    setShowUpdateForm(false); 
    setSelectedBook(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Books</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {data.findAllBooks.map((book) => (
          <div key={book.id} className="col">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Author: {book.author.name}</h6>
                <p className="card-text">{book.description}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <button className="btn btn-outline-primary" onClick={() => handleUpdateClick(book)}>
                    Update
                  </button>
                  <DeleteBook bookId={book.id} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4">Total Books: {data.countBooks}</p>

      {showUpdateForm && selectedBook && (
        <div className="mt-4">
          <h3>Update Book</h3>
          <UpdateBook book={selectedBook} onUpdateComplete={handleUpdateComplete} />
        </div>
      )}
    </div>
  );
};

export default Books;
