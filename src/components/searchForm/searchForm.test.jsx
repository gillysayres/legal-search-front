import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SearchForm from './searchForm';

test('disables the form button when input is invalid or loading', () => {
  // Mock the handleSearch function
  const handleSearch = jest.fn();

  // Render the SearchForm component with invalid input and loading state
  render(<SearchForm handleSearch={handleSearch} />);

  // Find the input field by its label text
  const inputElement = screen.getByLabelText('Número CNJ:');

  // Simulate user typing into the input field with an invalid CNJ
  fireEvent.change(inputElement, { target: { value: '12345' } });

  // Find the submit button
  const submitButton = screen.getByText('Consultar');

  // Verify that the button is initially disabled due to invalid input
  expect(submitButton).toBeDisabled();

  // Simulate clearing the input
  fireEvent.change(inputElement, { target: { value: '' } });

  // Verify that the button is still disabled due to empty input
  expect(submitButton).toBeDisabled();

  // Simulate setting the input to a valid CNJ
  fireEvent.change(inputElement, { target: { value: '12345678901234567890' } });

  // Verify that the button is no longer disabled with valid input
  expect(submitButton).not.toBeDisabled();
});
