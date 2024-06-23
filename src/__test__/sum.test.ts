import sum from '../sum';

describe('sum', () => {
  it('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds 2 + 3 to equal 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  it('adds 3 + 4 to equal 7', () => {
    expect(sum(3, 4)).toBe(7);
  });
});
