import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>('../../../assets/data/user.json');
  }

  getAllUserImages(): Observable<any> {
    return this.http.get<any>('../.../../assets/data/user_images.json');
  }
}
