import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Deal } from './deal';
// Import HttpHeaders
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// Import AuthService
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  // Define the routes we are going to interact with
  private publicDealsUrl = 'http://localhost:4200/service/api/deals/public';
  private privateDealsUrl = 'http://localhost:4200/service/api/deals/private';


  constructor(
    private http: HttpClient,
    private authService: AuthService) { }
   // Implement a method to get the public deals
   getPublicDeals() {
    return this.http.get<Deal[]>(this.publicDealsUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to get the private deals
  getPrivateDeals() {
    return this.http
      .get<Deal[]>(
        this.privateDealsUrl,
        {headers: new HttpHeaders().set('Authorization', `Bearer ${this.authService.accessToken}`)}
      ).pipe(
        catchError(this.handleError)
      );
  }

  // Implement a method to handle errors if any
  private handleError(err: HttpErrorResponse | any) {
    console.error('An error occurred', err);
    return throwError(err.message || err);
  }

  purchase(item) {
    alert(`You bought the: ${item.name}`);
  }
}
