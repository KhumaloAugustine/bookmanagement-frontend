import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '../graphql';

const DeleteBook = ({ bookId }) => {
  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
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
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteBook;
