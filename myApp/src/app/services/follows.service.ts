import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Follow } from '../interfaces/follow';

@Injectable({
  providedIn: 'root'
})
export class FollowsService {

  constructor(private http: HttpClient) {}

  createFollow(follow: Follow): Observable<Follow> {
    return this.http.post<Follow>('http://localhost:8080/follows', follow);
  }

  deleteFollow(userId: number): Observable<any>{
    return this.http.delete('http://localhost:8080/delete?id=' + userId);
  }

  isFollowed(follower: number, followed: number): Observable<any>{
    return this.http.get('http://localhost:8080/isFollowedBy?id=' + {follower,followed});
  }
}
