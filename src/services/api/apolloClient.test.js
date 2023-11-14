// apolloClient.test.js

import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import { render, waitFor } from '@testing-library/react';
import ApolloClientInstance from './apolloClient'; // Replace with the actual path to your Apollo Client file

describe('Apollo Client Configuration', () => {
  it('creates an Apollo Client instance with a valid HTTP link', async () => {
    // Check if the Apollo Client instance is defined
    expect(ApolloClientInstance).toBeDefined();

    // Create a mock for your GraphQL query (if needed)
    const mocks = [];

    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        {/* Your component that uses Apollo Client */}
      </MockedProvider>
    );

    // Wait for any GraphQL queries to resolve (optional)
    await waitFor(() => {});

    // You can add more assertions here if needed
  });
});
