import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Authors from './components/Authors';
import Books from './components/Books';
import AddAuthor from './components/AddAuthor';
import AddBook from './components/AddBook';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Book Management</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-author">Add Author</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/add-book">Add Book</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/authors">Authors</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-author" element={<AddAuthor />} />
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/books" element={<Books />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
