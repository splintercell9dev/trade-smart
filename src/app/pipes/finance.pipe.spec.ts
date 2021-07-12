import { FinancePipe } from './finance.pipe';

describe('FinancePipe', () => {
  it('create an instance', () => {
    const pipe = new FinancePipe();
    expect(pipe).toBeTruthy();
  });
});
