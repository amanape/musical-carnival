import { useState, useCallback } from 'react';

type CycleState<T> = [T, () => void];

/**
 * @description
 * Cycles through the given array of values.
 *
 * ```jsx
 * import React from 'react';
 * import useCycle from "hooks/useCycle";
 *
 * export const Component = () => {
 *    const [value, cycle] = useCycle(["A", "B", "C"]);
 *
 *    return <div>{value}</div>;
 * }
 * ```
 *
 * @param items - Array of items to cycle through.
 * @returns [currentItem, cycleItems]
 */
const useCycle = <T>(items: T[]): CycleState<T> => {
  const [index, setIndex] = useState(0);

  const cycle = useCallback(() => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length); // Modulo ensures that the index will always be in range.
  }, [items.length]);

  return [items[index], cycle];
};

export default useCycle;
