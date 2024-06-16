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
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQse-umsrX9k0KgkbsTDgDcga-7zUjTLkc3ww&s" alt="Books" className="img-fluid" />
          </div>
        </div>
      </div>

      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="feature">
                <i className="bi bi-book-fill"></i>
                <h3>Manage Books</h3>
                <p>Efficiently manage your collection of books with our intuitive interface.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature">
                <i className="bi bi-person-fill"></i>
                <h3>Explore Authors</h3>
                <p>Discover and learn about various authors and their works.</p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="feature">
                <i className="bi bi-journal-richtext"></i>
                <h3>Update and Delete</h3>
                <p>Easily update and delete books from your collection as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="container">
          <h2>What Our Users Say</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="testimonial">
                <p>"Book Management has made my life so much easier. I can now keep track of my favorite books effortlessly."</p>
                <cite>- Augustine Khumalo</cite>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial">
                <p>"The interface is clean and intuitive. Finding new books to read has never been this enjoyable."</p>
                <cite>- Augustine Khumalo</cite>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="testimonial">
                <p>"I love how I can update book details with just a few clicks. It's incredibly user-friendly."</p>
                <cite>- Augustine Khumalo</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h3>Book Management</h3>
              <p>&copy; 2024 Book Management. All rights reserved.</p>
            </div>
            <div className="col-lg-6">
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/books">Books</Link></li>
                <li><Link to="/authors">Authors</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
};

export default Home;
