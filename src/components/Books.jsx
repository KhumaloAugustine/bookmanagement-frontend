import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_BOOKS = gql`
  query GetBooks {
    findAllBooks {
      id
      title
      description
      author {
        id
        name
      }
    }
    countBooks
  }
`;

const Books = () => {
  const { loading, error, data } = useQuery(GET_BOOKS);

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
          </li>
        ))}
      </ul>
      <p>Total Books: {data.countBooks}</p>
    </div>
  );
};

export default Books;
