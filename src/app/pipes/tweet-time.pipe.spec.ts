import { TweetTimePipe } from './tweet-time.pipe';

describe('TweetTimePipe', () => {
  it('create an instance', () => {
    const pipe = new TweetTimePipe();
    expect(pipe).toBeTruthy();
  });
});
