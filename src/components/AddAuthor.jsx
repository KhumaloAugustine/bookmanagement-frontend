import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_AUTHORS } from '../graphql';

const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!) {
    newAuthor(name: $name) {
      id
      name
    }
  }
`;

const AddAuthor = () => {
  const [name, setName] = useState('');
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }], 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please enter an author name.');
      return;
    }
    addAuthor({ variables: { name } });
    setName('');
  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Author Name"
        />
        <button type="submit">Add</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <p>Author added: {data.newAuthor.name}</p>}
    </div>
  );
};

export default AddAuthor;
