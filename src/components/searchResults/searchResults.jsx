// import React from 'react';
// import '../../assets/styles/searchResults.css';

// function SearchResults({ loading, error, data }) {
//   if (loading) return <p>Buscando...</p>;
//   if (error) return <p>Erro :( Tente novamente</p>;

//   return (
//     data &&
//     data.searchLegalCases.length > 0 && (
//       <div className="results-container">
//         {data &&
//           data.searchLegalCases.map((caseDetail) => (
//             // Each case detail is wrapped in a div container with a unique key
//             <div key={caseDetail.cnjNumber} className="case-container">
//               <h2 className="case-header">
//                 Processo nº {caseDetail.cnjNumber}
//               </h2>
//               <div className="case-details">
//                 <span className="case-detail">
//                   Tribunal: {caseDetail.originCourt}
//                 </span>
//                 <span className="case-detail">
//                   Partes Envolvidas: {caseDetail.partyNames}
//                 </span>
//               </div>
//               <h3 className="case-header">Movimentações</h3>
//               <ul className="case-movements">
//                 {caseDetail.movements.map((movement, index) => (
//                   // List item for each movement with a unique key
//                   <li key={index} className="case-movement">
//                     <p className="case-detail">
//                       {movement.date} - {movement.description}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//       </div>
//     )
//   );
// }

// export default SearchResults;

import React from 'react';
import '../../assets/styles/searchResults.css';

function SearchResults({ loading, error, data }) {
  // Display a loading message
  if (loading) return <p>Buscando...</p>;
  // Display an error message
  if (error) return <p>Erro :( Tente novamente</p>;
  // Check if data is available and if searchLegalCases is an array with elements
  if (
    !data ||
    !Array.isArray(data.searchLegalCases) ||
    data.searchLegalCases.length === 0
  ) {
    // Display a message if no results are found
    return <p>Nenhum resultado encontrado</p>;
  }

  // Render the search results
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
