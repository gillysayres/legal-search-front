import React from 'react';
import useSearchForm from '../../hooks/useSearchForm';
import '../../assets/styles/searchForm.css';

function SearchForm({ handleSearch }) {
  // Destructure the states and handlers from useSearchForm hook
  const {
    search,
    isCnjValid,
    searchPerformed,
    recordsFound,
    errorMessage,
    loading,
    handleInputChange,
    handleSubmit,
  } = useSearchForm(handleSearch);

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label htmlFor="cnjNumber" className="label">
            Número CNJ:
          </label>
          <input
            id="cnjNumber"
            name="cnjNumber"
            type="text"
            value={search.cnjNumber}
            onChange={handleInputChange}
            placeholder="Digite o número CNJ"
            required
            maxLength="25"
            // Dynamically set the className based on CNJ validity
            className={`input ${!isCnjValid ? 'invalid-input' : ''}`}
          />
          {/* Display error message if CNJ is invalid */}
          {!isCnjValid && <p className="error-message">Número CNJ inválido</p>}
        </div>
        <button
          type="submit"
          className="button"
          // Disable button when input is invalid or when loading
          disabled={!isCnjValid || loading}
        >
          {/* Show loading message if loading, otherwise show search prompt */}
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
        {/* Show no records message if search was performed and no records were found */}
        {searchPerformed && !recordsFound && (
          <p className="no-records-message">
            Nenhum processo com esse número CNJ foi encontrado.
          </p>
        )}
        {/* Display any error messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default SearchForm;
