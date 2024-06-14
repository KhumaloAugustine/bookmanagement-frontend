import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
  query GetBooks {
    findAllBooks {
      id
      title
      description
      author {
        id
        name
      }
    }
    countBooks
  }
`;

export const GET_AUTHORS = gql`
  query GetAuthors {
    findAllAuthors {
      id
      name
    }
    countAuthors
  }
`;

export const DELETE_BOOK = gql`
  mutation DeleteBook($id: ID!) {
    deleteBook(id: $id) {
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($id: ID!, $title: String!, $description: String!, $authorId: ID!) {
    updateBook(id: $id, title: $title, description: $description, authorId: $authorId) {
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
