import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

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
  const [addAuthor, { data, loading, error }] = useMutation(ADD_AUTHOR);

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
    <div className="container mt-4">
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="authorName" className="form-label">Author Name</label>
          <input
            type="text"
            id="authorName"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter author name"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>
      {loading && <p className="mt-3">Loading...</p>}
      {error && <p className="mt-3 text-danger">Error: {error.message}</p>}
      {data && <p className="mt-3 text-success">Author added: {data.newAuthor.name}</p>}
    </div>
  );
};

export default AddAuthor;
