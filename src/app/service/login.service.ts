import { Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class LoginService {


  private BASE_USER_URL = 'http://localhost:8080/api/users';
  public storageSub= new Subject<string>();

  constructor(private http: HttpClient) {
  }

  public login(userMail: string, userPassword: string) {
    return this.http.post<any>((`${this.BASE_USER_URL}/login/${userMail}/${userPassword}`), {userMail, userPassword });
  }

  public register(userMail: string, userPassword: string) {
    return this.http.post<any>((`${this.BASE_USER_URL}/register/${userMail}/${userPassword}`), {userMail, userPassword });
  }


  setToken(key: string, data: any) {
    localStorage.setItem(key, data);
    this.storageSub.next('tokenAdded');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }



}


