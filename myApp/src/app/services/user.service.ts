import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = '../assets/data/user.json';
  constructor(private http: HttpClient) {}

  getAllUser(): Observable<any> {
    return this.http.get<any>('../../../assets/data/user.json');
  }
  getAllUserImages(): Observable<any> {
    return this.http.get<any>('../.../../assets/data/user_images.json');
  }

  getUserInfo(email: any): Observable<any>{
    return this.http.get<any>(`http://localhost:8080/users/getUsers?filterField=email&filterValue=${email}`);
  }

  userDirectionInfo(id: any, user: any): Observable<any>{
    let idLong = Number(id);
    console.log("user service: " + user.id + " " + user.address);
    return this.http.put<User>(`http://localhost:8080/users/updateUser?id=${idLong}`, user);
  }

  userCartIsEmpty(userEmail: string): Observable<boolean> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((users) => {
        const user = users.find((u) => u.email === userEmail);
        if (user) {
          return user.cart.length === 0;
        }
        return true;
      })
    );
  }
}
