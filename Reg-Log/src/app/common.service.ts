import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { MatTabBodyPortal } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  host
  constructor(private http: HttpClient) {
    this.host = this.getHost()
   }

  getMethod(apiEndPoint): Observable<any> {

    let url = `${this.host}${apiEndPoint}`
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleErrorObservable)
  }
  postMethod(body, apiEndPoint): Observable<any> {

    let url = `${this.host}${apiEndPoint}`
    return this.http.post(url, body)
      .map(this.extractData)
      .catch(this.handleErrorObservable)
  }
  deleteMethod(apiEndPoint): Observable<any> {

    let url = `${this.host}${apiEndPoint}`
    return this.http.delete(url)
      .map(this.extractData)
      .catch(this.handleErrorObservable)
  }
  putMethod(body, apiEndPoint): Observable<any> {

   
    let url = `${this.host}${apiEndPoint}`
    return this.http.put(url, body)
      .map(this.extractData)
      .catch(this.handleErrorObservable)
  }


  private extractData(res: Response) {
    let body = res
    return body;
  }

  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  } 

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  isLoggednIn() {
    console.log(this.getToken() !== null)
    return this.getToken() !== null;
  }
  logout() {
    localStorage.removeItem("LoggedInUser");
    // this.myRoute.navigate(["login"]);
  }
  getHost() {
    let host = window.location.host
    let updatedhost = host.substring(0, host.indexOf(':'))
    let domain = `http://${updatedhost}:3000`
    return domain
  }
}
