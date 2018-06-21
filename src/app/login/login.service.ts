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
        // console.log("LoginService");
    }

    doLogin(user: IUser): Observable<boolean>{
        return this.http
            .post<boolean>(this.loginUrl, user,  httpOptions)
            .pipe(
                map(response => true),
                tap(val => this.log('doLogin')),          
                catchError(this.handleError2('doLogin', false) )
            );  //pipe
    }//doLogin


    private log(message: string) {
        console.log("Log Message = ", message);
    }

    // private handleError(err: HttpErrorResponse) {
    //    let errorMessage = '';
    //     if (err.error instanceof Error) {
    //         // A client-side or network error occurred. Handle it accordingly.
    //         errorMessage = `An error occurred: ${err.error.message}`;
    //     } else {
    //         // The backend returned an unsuccessful response code.
    //         // The response body may contain clues as to what went wrong,
    //         errorMessage = `Status code: ${err.status}, message: ${err.message}`; 
    //        //errorMessage = "Status code: " + err.status + ", Message: " + err.message;
    //     }
    //     this.log("webservice errorMessage = " + errorMessage);
    //     //this.log( "errorMessage = " + errorMessage); not working
    //     //return Observable.throw(errorMessage);  //this creates multiple console errors.
    //     return throwError(errorMessage); //this creates a better console error.
    // }

    private handleError2<T> (operation = 'operation', result?: T) {  //https://angular.io/tutorial/toh-pt6        
        return (error: any): Observable<T> => {
        
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);
    
            // TODO: send the error to remote logging infrastructure
            let str = JSON.stringify(error, null, 4); 
            this.log('error=' + str); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };    
    } // handleError

}//class