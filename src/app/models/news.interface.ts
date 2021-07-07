import { Investing } from './reddit.investing.interface';
import { WallStreetBets } from './reddit.wallstreet.interface';
import { Data, Twitter } from './twitter.interface';

export interface NewsAPI {
    code: number;
    news: News[];
}

export interface News {
    source:      Source;
    author:      null | string;
    title:       string;
    description: string;
    url:         string;
    urlToImage:  string;
    publishedAt: Date;
    content:     string;
    sentiment:   string;
}

export interface Source {
    id:   null;
    name: string;
}

export interface FeedAPI{
    twitter: Twitter[] ;
    reddit: RedditType ;
    news: News[] ;
}

export interface RedditType{
    wallstreetbets: WallStreetBets[] ;
    investing: Investing[] ;
}
