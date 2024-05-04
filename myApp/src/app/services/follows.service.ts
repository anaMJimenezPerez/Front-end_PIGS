import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FollowsService {

  constructor(private http: HttpClient) {}

  getAllFollows(): Observable<any> {
    return this.http.get<any>('../../../assets/data/follows.json');
  }
}
