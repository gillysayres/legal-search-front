import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchResults from './searchResults';

describe('SearchResults component', () => {
  it('renders loading message when loading is true', () => {
    const loading = true;
    const error = false;
    const data = null;

    render(<SearchResults loading={loading} error={error} data={data} />);

    const loadingMessage = screen.getByText('Buscando...');
    expect(loadingMessage).toBeInTheDocument();
  });

  it('renders error message when error is true', () => {
    const loading = false;
    const error = true;
    const data = null;

    render(<SearchResults loading={loading} error={error} data={data} />);

    const errorMessage = screen.getByText('Erro :( Tente novamente');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders search results when data is provided', () => {
    const loading = false;
    const error = false;
    const data = {
      searchLegalCases: [
        {
          cnjNumber: '123',
          originCourt: 'Court A',
          partyNames: 'Party A',
          movements: [{ date: '2023-01-01', description: 'Movement 1' }],
        },
        {
          cnjNumber: '456',
          originCourt: 'Court B',
          partyNames: 'Party B',
          movements: [{ date: '2023-02-01', description: 'Movement 2' }],
        },
      ],
    };

    render(<SearchResults loading={loading} error={error} data={data} />);

    const caseHeaders = screen.getAllByText(/Processo nº/);
    expect(caseHeaders).toHaveLength(2);

    const tribunalText = screen.getAllByText(/Tribunal:/);
    expect(tribunalText).toHaveLength(2);

    const partyText = screen.getAllByText(/Partes Envolvidas:/);
    expect(partyText).toHaveLength(2);

    const movementHeaders = screen.getAllByText(/Movimentações/);
    expect(movementHeaders).toHaveLength(2);

    const movementDescriptions = screen.getAllByText(/Movement/);
    expect(movementDescriptions).toHaveLength(2);
  });
});
