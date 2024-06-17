import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, UPDATE_BOOK } from '../graphql';

const UpdateBook = ({ book, onUpdateComplete }) => {
  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK, {
    onCompleted: () => onUpdateComplete()
  });
  const [title, setTitle] = useState(book.title);
  const [description, setDescription] = useState(book.description);
  const [authorId, setAuthorId] = useState(book.author.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook({ variables: { id: book.id, title, description, authorId } });
  };

  if (authorsLoading) return <p>Loading authors...</p>;
  if (authorsError) return <p>Error loading authors: {authorsError.message}</p>;

  return (
    <div className="container mt-4">
      <h3>Update Book</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <select
            className="form-select"
            id="author"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            {authorsData.findAllAuthors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Updating...' : 'Update'}
        </button>
        {error && <p className="mt-2 text-danger">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default UpdateBook;
