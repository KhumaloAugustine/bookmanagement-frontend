import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHORS, UPDATE_BOOK } from '../graphql';

const UpdateBook = ({ book }) => {
  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);
  const [updateBook, { loading, error }] = useMutation(UPDATE_BOOK);
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Book Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Book Description"
      />
      <select value={authorId} onChange={(e) => setAuthorId(e.target.value)}>
        {authorsData.findAllAuthors.map((author) => (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Updating...' : 'Update'}
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default UpdateBook;
