import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_BOOK, GET_BOOKS } from '../graphql';

const DeleteBook = ({ bookId }) => {
  const [deleteBook, { loading, error }] = useMutation(DELETE_BOOK, {
    refetchQueries: [{ query: GET_BOOKS }],
  });

  const handleDelete = () => {
    deleteBook({ variables: { id: bookId } });
  };

  return (
    <button onClick={handleDelete} disabled={loading}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteBook;
