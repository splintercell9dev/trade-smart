import { RedditTimePipe } from './reddit-time.pipe';

describe('RedditTimePipe', () => {
  it('create an instance', () => {
    const pipe = new RedditTimePipe();
    expect(pipe).toBeTruthy();
  });
});
