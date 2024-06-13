import React from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import AddAuthor from './components/AddAuthor';
import AddBook from './components/AddBook';

const App = () => {
  return (
    <div>
      <h1>Book Management</h1>
      <AddAuthor />
      <AddBook />
      <Authors />
      <Books />
    </div>
  );
};

export default App;
