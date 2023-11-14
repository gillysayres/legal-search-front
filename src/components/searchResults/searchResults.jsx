import React from 'react';
import '../../assets/styles/searchResults.css';

function SearchResults({ loading, error, data }) {
  if (loading) return <p>Buscando...</p>;
  if (error) return <p>Erro :( Tente novamente</p>;
  // Check if data is available and if searchLegalCases is an array with elements
  if (
    !data ||
    !Array.isArray(data.searchLegalCases) ||
    data.searchLegalCases.length === 0
  ) {
    return <p>Nenhum resultado encontrado</p>;
  }

  return (
    <div className="results-container">
      {data.searchLegalCases.map((caseDetail) => (
        <div key={caseDetail.cnjNumber} className="case-container">
          <h2 className="case-header">Processo nº {caseDetail.cnjNumber}</h2>
          <div className="case-details">
            <span className="case-detail">
              Tribunal: {caseDetail.originCourt}
            </span>
            <span className="case-detail">
              Partes Envolvidas: {caseDetail.partyNames}
            </span>
          </div>
          <h3 className="case-header">Movimentações</h3>
          <ul className="case-movements">
            {caseDetail.movements.map((movement, index) => (
              <li key={index} className="case-movement">
                <p className="case-detail">
                  {movement.date} - {movement.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default SearchResults;
