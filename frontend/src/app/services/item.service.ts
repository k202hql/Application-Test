import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  REST_API: string = 'http://localhost/backend/api';
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Get all
  GetItems() {
    let API_URL = `${this.REST_API}/read.php`;
    return this.httpClient.get(API_URL);
  }

  getbyId(id: any) {
    console.log(id);
    let API_URL = `${this.REST_API}/getbyid.php`;
    return this.httpClient.post(API_URL, { "id": id }).pipe(catchError(this.handleError));
  }

  createItem(addItem: any): Observable<any> {
    let api = `${this.REST_API}/additem.php`;
    return this.httpClient.post<any>(api, JSON.stringify(addItem), { headers: this.httpHeaders });
  }

  updateItem(upItem: any): Observable<any> {
    let api = `${this.REST_API}/updateitem.php`;
    return this.httpClient.post<any>(api, JSON.stringify(upItem), { headers: this.httpHeaders });
  }

  DeleteItem(id: any) {
    let API_URL = `${this.REST_API}/delete.php`;
    return this.httpClient.post(API_URL, { "id": id }).pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    }
    else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
