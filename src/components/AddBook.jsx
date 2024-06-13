import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query GetAuthors {
    findAllAuthors {
      id
      name
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($title: String!, $description: String!, $authorId: ID!) {
    newBook(title: $title, description: $description, authorId: $authorId) {
      id
      title
      description
      author {
        id
        name
      }
    }
  }
`;

const AddBook = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [addBook, { data: bookData, loading: bookLoading, error: bookError }] = useMutation(ADD_BOOK);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ variables: { title, description, authorId } });
    setTitle('');
    setDescription('');
    setAuthorId('');
  };

  if (loading) return <p>Loading authors...</p>;
  if (error) return <p>Error loading authors: {error.message}</p>;

  return (
    <div>
      <h2>Add Book</h2>
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
          <option value="">Select Author</option>
          {data.findAllAuthors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
      {bookLoading && <p>Loading...</p>}
      {bookError && <p>Error: {bookError.message}</p>}
      {bookData && <p>Book added: {bookData.newBook.title}</p>}
    </div>
  );
};

export default AddBook;
