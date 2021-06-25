import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { apiBaseUrl } from '../../environments/environment' ;
import { GraphResult, StockIndicesResult } from '../models/home.interface';

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
}
