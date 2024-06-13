import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_AUTHORS = gql`
  query GetAuthors {
    findAllAuthors {
      id
      name
    }
    countAuthors
  }
`;

const Authors = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {data.findAllAuthors.map((author) => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
      <p>Total Authors: {data.countAuthors}</p>
    </div>
  );
};

export default Authors;
