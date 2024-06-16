import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_AUTHORS } from '../graphql';

const Authors = () => {
  const { loading, error, data } = useQuery(GET_AUTHORS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2>Authors</h2>
      <ul className="list-group">
        {data.findAllAuthors.map((author) => (
          <li key={author.id} className="list-group-item">{author.name}</li>
        ))}
      </ul>
      <p className="mt-3">Total Authors: {data.countAuthors}</p>
    </div>
  );
};

export default Authors;
