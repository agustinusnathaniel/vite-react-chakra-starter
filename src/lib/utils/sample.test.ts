import { describe, expect, test } from 'vite-plus/test';

import { sum } from './sample';

describe('sum', () => {
  test('positive number additions', () => {
    expect(sum(50, 41)).toBe(91);
    expect(sum(60, 41)).toBe(101);
  });

  test('negative number additions', () => {
    expect(sum(-50, -41)).toBe(-91);
    expect(sum(-60, -41)).toBe(-101);
  });

  test('positive and negative number additions', () => {
    expect(sum(-50, 41)).toBe(-9);
    expect(sum(-60, 41)).toBe(-19);
  });
});
