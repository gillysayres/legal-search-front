import { gql } from '@apollo/client';

export const SEARCH_LEGAL_CASES = gql`
  query SearchLegalCases($cnjNumber: String) {
    searchLegalCases(cnjNumber: $cnjNumber) {
      cnjNumber
      originCourt
      partyNames
      startDate
      movements {
        date
        description
      }
    }
  }
`;
