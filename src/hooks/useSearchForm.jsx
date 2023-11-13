import { useState } from 'react';

// Custom hook for handling the state and logic of a search form
function useSearchForm(handleSearch) {
  // State for storing search inputs with initial values
  const [search, setSearch] = useState({ cnjNumber: '' });
  // State to track CNJ number validity
  const [isCnjValid, setIsCnjValid] = useState(true);
  // State to check if a search has been performed
  const [searchPerformed, setSearchPerformed] = useState(false);
  // State to check if any records have been found
  const [recordsFound, setRecordsFound] = useState(true);
  // State for storing error messages
  const [errorMessage, setErrorMessage] = useState('');
  // State to indicate if the search is in progress
  const [loading, setLoading] = useState(false);

  // Validates the CNJ number format using a regex pattern
  const validateCNJ = (number) => {
    const regex = /^\d{7}-\d{2}.\d{4}.\d{1}.\d{2}.\d{4}$/;
    return regex.test(number);
  };

  // Formats the input CNJ number into the correct format
  const formatCNJNumber = (number) => {
    let digits = number.replace(/\D/g, ''); // Removes non-digit characters
    digits = digits.slice(0, 20); // Limits the number of digits
    // Formats the number into the CNJ format using regex
    return digits
      .replace(
        /(\d{7})(\d{2})(\d{4})(\d{1})(\d{2})(\d{4})/,
        '$1-$2.$3.$4.$5.$6'
      )
      .replace(/[\.-]+$/, ''); // Removes trailing punctuation
  };

  // Handles changes to the form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // If the input is for the CNJ number, format and validate it
    if (name === 'cnjNumber') {
      formattedValue = formatCNJNumber(value);
      setIsCnjValid(validateCNJ(formattedValue));
    }
    console.log('Input Change:', formattedValue);
    // Update the search state with the new value
    setSearch((prevState) => ({
      ...prevState,
      [name]: formattedValue,
    }));
  };

  // Handles the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isCnjValid) {
      setLoading(true); // Begin loading state
      try {
        // Perform the search using the provided search handler
        const results = await handleSearch(search.cnjNumber);
        setSearchPerformed(true); // Indicate that a search was performed
        setRecordsFound(results && results.length > 0); // Update recordsFound based on results
        setErrorMessage(''); // Clear any error messages
      } catch (error) {
        // Handle any errors that occur during the search
        setErrorMessage(error.message || 'Ocorreu um erro durante a busca');
        setRecordsFound(false); // Assume no records found on error
      } finally {
        setLoading(false); // End loading state
      }
    }
  };

  // Returns the states and handlers to be used by the search form component
  return {
    search,
    isCnjValid,
    searchPerformed,
    recordsFound,
    errorMessage,
    loading,
    handleInputChange,
    handleSubmit,
  };
}

// Export the custom hook for use in other components
export default useSearchForm;
