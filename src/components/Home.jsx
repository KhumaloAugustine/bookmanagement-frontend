import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

const Home = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <h1>Welcome to Book Management</h1>
            <p>Manage your books with ease and efficiency. Explore our collection of books and authors.</p>
            <Link to="/books" className="btn btn-primary">Explore Books</Link>
          </div>
          <div className="col-lg-6">
            {/* Optional: Add an image related to books */}
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnDjD5KiTN7kvesAbFvHcXWkNt2RTCC_IIxiyB3TsF0hYyXL5n1jAJBOBsHg&s" alt="Books" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
