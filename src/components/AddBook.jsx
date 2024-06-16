import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { GET_AUTHORS, GET_BOOKS } from '../graphql';
import { Modal, Button } from 'react-bootstrap';

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
  const { loading: authorsLoading, error: authorsError, data: authorsData } = useQuery(GET_AUTHORS);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addBook, { data: bookData, loading: bookLoading, error: bookError }] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (error) => {
      console.error('Error adding book:', error.message);
    },
    onCompleted: () => {
      setShowSuccessModal(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a book title.');
      return;
    }
    if (!description.trim()) {
      alert('Please enter a book description.');
      return;
    }
    if (!authorId) {
      alert('Please select an author.');
      return;
    }

    addBook({ variables: { title, description, authorId } });
    setTitle('');
    setDescription('');
    setAuthorId('');
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (authorsLoading) return <p>Loading authors...</p>;
  if (authorsError) return <p>Error loading authors: {authorsError.message}</p>;

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bookTitle" className="form-label">Book Title</label>
          <input
            type="text"
            id="bookTitle"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter book title"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookDescription" className="form-label">Book Description</label>
          <input
            type="text"
            id="bookDescription"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="authorSelect" className="form-label">Select Author</label>
          <select
            id="authorSelect"
            className="form-select"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option value="">Select Author</option>
            {authorsData.findAllAuthors.map((author) => (
              <option key={author.id} value={author.id}>{author.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Book successfully added!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {bookLoading && <p className="mt-3">Loading...</p>}
      {bookError && <p className="mt-3 text-danger">Error: {bookError.message}</p>}
      {bookData && <p className="mt-3 text-success">Book added: {bookData.newBook.title}</p>}
    </div>
  );
};

export default AddBook;
