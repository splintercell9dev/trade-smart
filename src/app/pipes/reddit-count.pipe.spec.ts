import { RedditCountPipe } from './reddit-count.pipe';

describe('RedditCountPipe', () => {
  it('create an instance', () => {
    const pipe = new RedditCountPipe();
    expect(pipe).toBeTruthy();
  });
});
