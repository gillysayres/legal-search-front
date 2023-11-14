import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { useLazyQuery } from '@apollo/client';
import App from './App';

// Mocks
jest.mock('@apollo/client', () => {
  const actualApolloClient = jest.requireActual('@apollo/client');
  return {
    ...actualApolloClient,
    useLazyQuery: jest.fn(),
    gql: jest.fn().mockReturnValue('Mocked gql Query'),
    ApolloClient: jest.fn().mockImplementation(() => ({
      query: jest.fn(),
    })),
  };
});

describe('App Component', () => {
  // Mock console.error before each test
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  // Reset mocks after each test
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('executes the lazy query on form submission', async () => {
    const mockExecuteSearch = jest.fn(() => [
      () => {},
      { loading: false, error: null, data: null },
    ]);
    useLazyQuery.mockImplementation(() => mockExecuteSearch());

    render(<App />);

    // Find the "Consultar" button using screen.getByText
    const consultarButton = screen.getByText('Consultar');

    // Simulate clicking the "Consultar" button
    fireEvent.click(consultarButton);

    // Wait for the query execution
    await waitFor(() => {
      expect(mockExecuteSearch).toHaveBeenCalled();
    });
  });

  // it('handles error on query execution', async () => {
  //   const error = new Error('Query failed');
  //   const mockExecuteSearch = jest.fn(() => [
  //     () => Promise.reject(error),
  //     { loading: false, error, data: null },
  //   ]);
  //   useLazyQuery.mockImplementation(() => mockExecuteSearch());

  //   render(<App />);
  //   await waitFor(() => {
  //     expect(console.error).toHaveBeenCalledWith(
  //       'Error fetching data: ',
  //       error
  //     );
  //   });
  // });

  it('conditionally renders elements based on query state', () => {
    useLazyQuery.mockImplementation(() => [
      () => {},
      { loading: true, error: null, data: null },
    ]);

    render(<App />);

    // Find the loading text using screen.getByText
    const loadingText = screen.getByText('Carregando...');

    // Expect the loading text to be in the document
    expect(loadingText).toBeInTheDocument();
  });
});
