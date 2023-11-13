import { renderHook, act } from '@testing-library/react-hooks';
import useSearchForm from './useSearchForm'; // Import your hook file here

describe('useSearchForm', () => {
  it('should initialize with the correct default states', () => {
    const { result } = renderHook(() =>
      useSearchForm(/* provide a mock handleSearch function */)
    );

    expect(result.current.search).toEqual({ cnjNumber: '' });
    expect(result.current.isCnjValid).toBe(true);
    expect(result.current.searchPerformed).toBe(false);
    expect(result.current.recordsFound).toBe(true);
    expect(result.current.errorMessage).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('should validate CNJ numbers correctly', () => {
    const { result } = renderHook(() =>
      useSearchForm(/* provide a mock handleSearch function */)
    );

    // Test valid CNJ numbers
    expect(result.current.validateCNJ('1234567-89.1234.5.67.8901')).toBe(true);

    // Test invalid CNJ numbers
    expect(result.current.validateCNJ('invalid-cn')).toBe(false);
    expect(result.current.validateCNJ('1234567-89.1234.5.67.')).toBe(false);
  });

  it('should format CNJ numbers correctly', () => {
    const { result } = renderHook(() =>
      useSearchForm(/* provide a mock handleSearch function */)
    );

    // Test CNJ number formatting
    expect(result.current.formatCNJNumber('12345678912345678901')).toBe(
      '1234567-89.1234.5.67.8901'
    );
  });

  it('should handle input changes correctly', () => {
    const { result } = renderHook(() =>
      useSearchForm(/* provide a mock handleSearch function */)
    );

    // Simulate input change
    act(() => {
      result.current.handleInputChange({
        target: { name: 'cnjNumber', value: '12345678912345678901' },
      });
    });

    expect(result.current.search.cnjNumber).toBe('1234567-89.1234.5.67.8901');
    expect(result.current.isCnjValid).toBe(true);
  });

  it('should handle form submission with valid data correctly', async () => {
    const handleSearch =
      jest.fn(/* provide a mock implementation for handleSearch */);
    const { result } = renderHook(() => useSearchForm(handleSearch));

    // Simulate form submission
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    // Assert that loading state is set, and handleSearch is called
    expect(result.current.loading).toBe(true);
    expect(handleSearch).toHaveBeenCalledWith(result.current.search.cnjNumber);

    // Simulate successful search
    await act(async () => {
      await handleSearch.mockResolvedValue(/* provide mock search results */);
    });

    // Assert that loading state is reset and recordsFound is updated
    expect(result.current.loading).toBe(false);
    expect(
      result.current.recordsFound
    ).toBe(/* expected recordsFound value based on mock results */);
    expect(result.current.errorMessage).toBe('');
  });

  it('should handle form submission with invalid data correctly', () => {
    const { result } = renderHook(() =>
      useSearchForm(/* provide a mock handleSearch function */)
    );

    // Simulate form submission with invalid CNJ number
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    // Assert that handleSearch is not called and isCnjValid is false
    expect(result.current.isCnjValid).toBe(false);
  });

  it('should handle error in form submission correctly', async () => {
    const handleSearch =
      jest.fn(/* provide a mock implementation for handleSearch that throws an error */);
    const { result } = renderHook(() => useSearchForm(handleSearch));

    // Simulate form submission
    act(() => {
      result.current.handleSubmit({ preventDefault: () => {} });
    });

    // Assert that loading state is set
    expect(result.current.loading).toBe(true);

    // Simulate an error during search
    await act(async () => {
      await handleSearch.mockRejectedValue(new Error('Error message'));
    });

    // Assert that loading state is reset, errorMessage is set, and recordsFound is false
    expect(result.current.loading).toBe(false);
    expect(result.current.errorMessage).toBe('Error message');
    expect(result.current.recordsFound).toBe(false);
  });
});
