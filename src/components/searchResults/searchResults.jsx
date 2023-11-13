import React from 'react';
import '../../assets/styles/searchResults.css';

function SearchResults({ loading, error, data }) {
  if (loading) return <p>Buscando...</p>;
  if (error) return <p>Erro :( Tente novamente</p>;

  return (
    data &&
    data.searchLegalCases.length > 0 && (
      <div className="results-container">
        {data &&
          data.searchLegalCases.map((caseDetail) => (
            // Each case detail is wrapped in a div container with a unique key
            <div key={caseDetail.cnjNumber} className="case-container">
              <h2 className="case-header">
                Processo nº {caseDetail.cnjNumber}
              </h2>
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
                  // List item for each movement with a unique key
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
    )
  );
}

export default SearchResults;
