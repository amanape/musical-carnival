import { useState } from 'react';

/**
 * @description
 * Stores and retrieves values from local storage.
 *
 * @param key - The key to store the value under.
 * @param initialValue - The initial value to store.
 * @returns [value, setValue]
 * @example
 * ```jsx
 * import React from 'react';
 * import { useLocalStorage } from 'hooks/useLocalStorage';
 *
 * const Component = () => {
 *   const [value, setValue] = useLocalStorage('value', 'default');
 *
 *   return <div>{value}</div>;
 * }
 * ```
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, Function] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      // TODO: Do something with the error other than logging it.
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
