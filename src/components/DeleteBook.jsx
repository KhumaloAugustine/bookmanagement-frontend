import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '../graphql';
import { Modal, Button } from 'react-bootstrap';

const DeleteBook = ({ bookId }) => {
  const [showConfirmationModal, setShowConfirmationModal] = React.useState(false);
  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
    onError: (error) => {
      console.error('Error deleting book:', error.message);
    },
  });

  const handleDelete = async () => {
    try {
      const { data } = await deleteBook({ variables: { id: bookId } });
      console.log('Deleted book:', data.deleteBook);
    } catch (error) {
      console.error('Error deleting book:', error.message);
    }
    setShowConfirmationModal(false);
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  return (
    <>
      <Button variant="danger" onClick={() => setShowConfirmationModal(true)}>
        Delete Book
      </Button>

      <Modal show={showConfirmationModal} onHide={handleCloseConfirmationModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmationModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteBook;
