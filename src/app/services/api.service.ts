import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { apiBaseUrl } from '../../environments/environment' ;
import { GraphResult, StockIndicesResult } from '../models/home.interface';
import { NewsAPI } from '../models/news.interface';
import { RedditInvestingAPI } from '../models/reddit.investing.interface';
import { RedditWallStreetAPI } from '../models/reddit.wallstreet.interface';
import { SearchRequest } from '../models/search.interface';
import { TwitterAPI } from '../models/twitter.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getHomeData(){
    return forkJoin([
      this.http.get<StockIndicesResult>(`${apiBaseUrl}/metrics/stockIndices`),
      this.http.get<GraphResult>(`${apiBaseUrl}/metrics/graphData`)
    ]) ;
  }

  getFeedData(){
    return forkJoin([
      this.http.get<TwitterAPI>(`${apiBaseUrl}/twitter/people/posts`),
      this.http.get<RedditWallStreetAPI>(`${apiBaseUrl}/reddit/wallstreetbets`),
      this.http.get<RedditInvestingAPI>(`${apiBaseUrl}/reddit/investing`),
      this.http.get<NewsAPI>(`${apiBaseUrl}/news/all`)
    ]) ;
  }

  getSearchData(s: string){
    return this.http.get<SearchRequest>(`${apiBaseUrl}/company/search`, {
      params: {
        q: s
      }
    }) ;
  }
}
