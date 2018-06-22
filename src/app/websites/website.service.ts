
//angular for services
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams, HttpErrorResponse  } from '@angular/common/http';
import { environment } from '../../environments/environment';

//my models
import { IWebsite, Website } from './iwebsite';
import { IPurchase, Purchase } from './ipurchase';
import { ISearch } from './isearch';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class WebsiteService {

    private domain = environment.baseUrl;

    private searchUrl: string;
    private websiteUrl: string;
    private purchaseUrl: string;
    
    constructor(private http: HttpClient) { 

        this.searchUrl = this.domain + 'api/websitesearch';
        this.websiteUrl = this.domain + 'api/websites';
        this.purchaseUrl = this.domain + 'api/Purchases';
    }

    getWebsites(search: ISearch): Observable<IWebsite[]> {   

        let headers = new HttpHeaders(); 
        headers = headers.append ('Content-Type', 'application/json');

        let searchWord = (search.searchWord == null || search.searchWord == "") ? "" : encodeURIComponent(search.searchWord); 
        let params = new HttpParams().set('searchWord', searchWord);

        const url = `${this.searchUrl}/${search.isPreferred}/${search.isBill}`;  
        
        return this.http
            .get<IWebsite[]>(url, {headers, params })
            .pipe (
                tap(val => this.log('getWebsites')),          
                catchError(this.handleError2('getWebsites', []) )
            ); //pipe
   
    } // getWebsites       

    saveWebsite (website: IWebsite): Observable<number> {
        return this.http
            .post<number>(this.websiteUrl, website, httpOptions)
            .pipe(
                    tap(val => this.log('saveWebsite = ' + JSON.stringify(val))),
                    catchError(this.handleError2('saveWebsite', 0) )
        );
    } 
 

    deleteWebsite(websiteID: number) : Observable<boolean> {
        const url = `${this.websiteUrl}/${websiteID}`; 
        return this.http
            .delete<boolean>(url, httpOptions)
            .pipe(
                    tap(val => this.log('val = ' + JSON.stringify(val)))
                    , catchError(this.handleError)
        );        
    }//deleteWebsite




    getWebsiteById(id: number): Observable<IWebsite> { 
        const url = `${this.websiteUrl}/${id}`; 
        return this.http.get<IWebsite>(url)
        .pipe(      
            catchError(this.handleError)
        );
    }    

    getPurchase(websiteID: number, purchaseID: number): Observable<IPurchase>{
        const url = `${this.purchaseUrl}/${purchaseID}/${websiteID}`;       
        return this.http
            .get<IPurchase>(url)
            .pipe(
                // tap(search => this.log(`getPurchase`)),          
                catchError(this.handleError)
        );
    }

    savePurchase(purchase: IPurchase): Observable<IPurchase>{
        return this.http
            .post<IPurchase>(this.purchaseUrl, purchase,  httpOptions)
            .pipe(
                tap(purchaseID => this.log('savePurchase purchaseid: ' + purchaseID)),          
                catchError(this.handleError)
        ); 
    }

// works ide
    // deletePurchase(purchaseID: number, websiteID: number) : Observable<boolean>{
    //     const url = `${this.purchaseUrl}/${purchaseID}/${websiteID}`; 
    //     let deleteHttpOptions = {
    //         headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    //         body: purchaseID
    //     };
    //     return this.http
    //         .delete<boolean>(url, deleteHttpOptions)
    //         .pipe(
    //                 tap(val => this.log('val = ' + JSON.stringify(val)))
    //                 , catchError(this.handleError)
    //     );        
    // }   

    //works ide
    deletePurchase(purchaseID: number, websiteID: number) : Observable<boolean>{
        const url = `${this.purchaseUrl}/${purchaseID}/${websiteID}`; 

        return this.http
            .delete<boolean>(url, httpOptions)
            .pipe(
                    tap(val => this.log('val = ' + JSON.stringify(val)))
                    , catchError(this.handleError)
        );        
    }    

    // doLogin(user: IUser): Observable<boolean>{
    //     return this.http
    //         .post<boolean>(this.loginUrl, user,  httpOptions)
    //         .pipe(
    //             tap(purchaseID => this.log('doLogin')),          
    //             catchError(this.handleError)
    //     ); 
    // }

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
        


  }//class



