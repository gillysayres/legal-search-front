import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import SearchForm from './components/searchForm/searchForm';
import SearchResults from './components/searchResults/searchResults';
import { SEARCH_LEGAL_CASES } from './services/api/queries';
import jusbrasilLogo from './assets/images/jusbrasil-logo.svg';
import './App.css';

function App() {
  const [recordsFound, setRecordsFound] = useState(true); // State to keep track of whether records were found

  const [executeSearch, { loading, error, data }] = useLazyQuery(
    SEARCH_LEGAL_CASES,
    {
      // Removing variables here since they will be set dynamically in handleFormSubmit
      fetchPolicy: 'no-cache', // Ensuring fresh results on each search
    }
  );

  const handleFormSubmit = async (cnjNumberFromForm) => {
    // Log before executing the search
    console.log('Executing search with CNJ Number:', cnjNumberFromForm);

    try {
      // Execute the search with the CNJ number provided from the form
      const result = await executeSearch({
        variables: { cnjNumber: cnjNumberFromForm },
      });

      // Check if data contains search results and update the state accordingly
      if (
        result.data &&
        result.data.legalCases &&
        result.data.legalCases.length > 0
      ) {
        // Results found, update the recordsFound state to true
        setRecordsFound(true);
      } else {
        // No results found, update the recordsFound state to false
        setRecordsFound(false);
      }
    } catch (fetchError) {
      // Handle errors with the search (e.g., network issues, query errors)
      console.error('Error fetching data: ', fetchError);
      setRecordsFound(false); // Assume no records found if there's an error
    }
  };

  return (
    <div className="app-container">
      <img
        src={jusbrasilLogo}
        alt="Jusbrasil Logo"
        className="jusbrasil-logo"
      />
      <header className="app-header">
        <h1 className="app-title">Consulta Processual</h1>
      </header>
      <SearchForm handleSearch={handleFormSubmit} />
      {loading && <p>Carregando...</p>}
      {!loading && !recordsFound && (
        <p>Nenhum processo com esse número CNJ foi encontrado.</p>
      )}
      <SearchResults loading={loading} error={error} data={data} />
    </div>
  );
}

export default App;
