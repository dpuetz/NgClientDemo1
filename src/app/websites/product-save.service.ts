//angular for services
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

//my models

import { WebsitesModule } from './websites.module';


@Injectable({
  providedIn: WebsitesModule
})

export class ProductSaveService {

//  https://blogs.msmvps.com/deborahk/build-a-simple-angular-service-to-share-data/
//    https://coryrylan.com/blog/angular-observable-data-services     
// https://www.lucidchart.com/techblog/2016/11/08/angular-2-and-observables-data-sharing-in-a-multi-view-application/

}//class



