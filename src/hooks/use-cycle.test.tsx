import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useCycle from './use-cycle';

describe('useCycle', () => {
  it('cycles through given states', () => {
    const results: number[] = [];

    const Component = () => {
      const [state, cycle] = useCycle([0, 1, 2]);
      results.push(state);
      return <button type="button" aria-label="cycle" onClick={cycle} />;
    };
    const { getByLabelText } = render(<Component />);
    const btn = getByLabelText('cycle');

    userEvent.click(btn);
    userEvent.click(btn);
    userEvent.click(btn);

    expect(results).toEqual([0, 1, 2, 0]);
  });

  it('is not functionally bound by the render cycle', () => {
    let result: number = 0;

    const Component = () => {
      const [state, cycle] = useCycle([0, 1, 2]);
      result = state;
      // eslint-disable-next-line no-sequences
      return <button type="button" aria-label="cycle" onClick={() => (cycle(), cycle())} />;
    };
    const { getByLabelText } = render(<Component />);
    const btn = getByLabelText('cycle');

    userEvent.click(btn);

    expect(result).toEqual(2);
  });
});
