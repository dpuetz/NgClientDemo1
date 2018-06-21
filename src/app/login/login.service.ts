//angular for services
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../environments/environment';

//my models
import { IUser } from './IUser';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})


export class LoginService {

    private domain = environment.baseUrl;

    private loginUrl: string;

    constructor(private http: HttpClient) { 
        this.loginUrl = this.domain + 'api/users';
        console.log("LoginService");
    }

    doLogin(user: IUser): Observable<boolean>{
        return this.http
            .post<boolean>(this.loginUrl, user,  httpOptions)
            .pipe(
                tap(purchaseID => this.log('doLogin')),          
                catchError(this.handleError)
        ); 
    }


    private log(message: string) {
        console.log("Log Message = ", message);
    }

    private handleError(err: HttpErrorResponse) {
       let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Status code: ${err.status}, message: ${err.message}`; 
           //errorMessage = "Status code: " + err.status + ", Message: " + err.message;
        }
        console.log("webservice errorMessage = " + errorMessage);
        //this.log( "errorMessage = " + errorMessage); not working
        //return Observable.throw(errorMessage);  //this creates multiple console errors.
        return throwError(errorMessage); //this creates a better console error.
    }

}//class