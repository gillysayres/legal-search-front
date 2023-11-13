import { useLazyQuery } from '@apollo/client';
import SearchForm from './components/searchForm/searchForm';
import SearchResults from './components/searchResults/searchResults';
import { SEARCH_LEGAL_CASES } from './services/api/queries';
import jusbrasilLogo from './assets/images/jusbrasil-logo.svg';
import './App.css';

function App() {
  const [executeSearch, { loading, error, data }] = useLazyQuery(
    SEARCH_LEGAL_CASES,
    {
      fetchPolicy: 'no-cache', // Ensuring fresh results on each search
    }
  );

  const handleFormSubmit = async (cnjNumberFromForm) => {
    // Log before executing the search
    console.log('Executing search with CNJ Number:', cnjNumberFromForm);

    try {
      // Execute the search with the CNJ number provided from the form
      await executeSearch({ variables: { cnjNumber: cnjNumberFromForm } });
    } catch (fetchError) {
      // Handle errors with the search (e.g., network issues, query errors)
      console.error('Error fetching data: ', fetchError);
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
      {/* Show loading message if loading */}
      {loading && <p>Carregando...</p>}
      <SearchResults loading={loading} error={error} data={data} />
    </div>
  );
}

export default App;
