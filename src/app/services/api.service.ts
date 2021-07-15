/* eslint-disable max-len */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { apiBaseUrl } from '../../environments/environment' ;
import { ChartDetails, CompanyFullDetails } from '../models/company.interface';
import { GraphResult, StockIndicesResult } from '../models/home.interface';
import { NewsAPI } from '../models/news.interface';
import { RedditInvestingAPI } from '../models/reddit.investing.interface';
import { RedditWallStreetAPI } from '../models/reddit.wallstreet.interface';
import { SearchRequest } from '../models/search.interface';
import { Twitter, TwitterAPI } from '../models/twitter.interface';
import { fullDetails } from '../static/static-data';

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

  getBookmarkData(list: string[]){
    return this.http.get<SearchRequest>(`${apiBaseUrl}/bookmarks`, {
      params: {
        array: JSON.stringify(list)
      }
    }) ;
  }

  async getCompanyFullDataWithTwitter(sym: string){
    const company = fullDetails.filter( c => c.symbol === sym )[0] ;

    return forkJoin([
      this.http.get<CompanyFullDetails>(`${apiBaseUrl}/company/fullDetails`, {
        params: {
          symbol: `${sym}.NS`
        }
      }),
      this.http.get<ChartDetails>(`${apiBaseUrl}/company/graph`, {
        params: {
          symbol: `${sym}.NS`,
          range: '1d'
        }
      }),
      this.http.get<NewsAPI>(`${apiBaseUrl}/news/company`, {
        params: {
          name: company.name
        }
      }),
      this.http.get<TwitterAPI>(`${apiBaseUrl}/twitter/company/posts`, {
        params: {
          symbol: sym
        }
      }),
    ]) ;
  }

  async getCompanyFullDataWithoutTwitter(sym: string){
    const company = fullDetails.filter( c => c.symbol === sym )[0] ;
    return forkJoin([
      this.http.get<CompanyFullDetails>(`${apiBaseUrl}/company/fullDetails`, {
        params: {
          symbol: `${sym}.NS`
        }
      }),
      this.http.get<ChartDetails>(`${apiBaseUrl}/company/graph`, {
        params: {
          symbol: `${sym}.NS`,
          range: '1d'
        }
      }),
      this.http.get<NewsAPI>(`${apiBaseUrl}/news/company`, {
        params: {
          name: company.name
        }
      })
    ]) ;
  }

  getChartValues(symbol: string, timeRange: '1d' | '5d' | '6mo' | '1y' | '5y' ){
    return this.http.get<ChartDetails>(`${apiBaseUrl}/company/graph`, {
      params: {
        symbol: `${symbol}.NS`,
        range: timeRange
      }
    }) ;
  }
}
