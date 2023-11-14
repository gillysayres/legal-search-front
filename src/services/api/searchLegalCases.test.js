// import React from 'react';
// import { MockedProvider } from '@apollo/client/testing';
// import { render, waitFor } from '@testing-library/react';
// import { SEARCH_LEGAL_CASES } from './queries';
// import SearchForm from '../../components/searchForm/searchForm';

// // Define mock data for your query
// const mocks = [
//   {
//     request: {
//       query: SEARCH_LEGAL_CASES,
//       variables: { cnjNumber: '12345' }, // Replace with the test input values
//     },
//     result: {
//       data: {
//         searchLegalCases: {
//           cnjNumber: '12345',
//           originCourt: 'Example Court',
//           partyNames: ['Party A', 'Party B'],
//           startDate: '2023-01-01',
//           movements: [
//             {
//               date: '2023-01-02',
//               description: 'Movement 1',
//             },
//             {
//               date: '2023-01-03',
//               description: 'Movement 2',
//             },
//           ],
//         },
//       },
//     },
//   },
// ];

// describe('SEARCH_LEGAL_CASES Query', () => {
//   it('fetches and renders data correctly', async () => {
//     const { getByText } = render(
//       <MockedProvider mocks={mocks} addTypename={false}>
//         <SearchForm />
//       </MockedProvider>
//     );

//     // Wait for the data to load
//     await waitFor(() => {
//       console.log(getByText('12345')); // Log the element for debugging
//       console.log(getByText('Example Court')); // Log other relevant elements
//       // Add more console.log statements to inspect other parts of the component
//     });
//   });
// });
