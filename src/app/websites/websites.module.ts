import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import { WebsitesComponent } from './websites.component';
import { WebsiteDetailComponent } from './website-detail.component';
import { PurchaseComponent } from './purchase.component';
import { CurrencyMaskModule } from "ng2-currency-mask"; 
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { AngularFontAwesomeModule } from 'angular-font-awesome';  //https://fontawesome.com/how-to-use/svg-with-js
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { WebsiteService } from './website.service';
import { WebsiteDetailResolver } from './website-detail.resolver';
import { PurchaseResolver } from './purchase.resolver';
import { PurchaseMainComponent } from './purchase-main.component';
import { PurchaseNotesComponent } from './purchase-notes.component';
import { ProductSaveService } from './product-save.service';


export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};

// const routes: Routes = [  
//         {
//             path: '',
//             component: WebsitesComponent
//         },
//         {
//             path: ':id/detail', 
//             component: WebsiteDetailComponent, 
//             resolve: {website: WebsiteDetailResolver},  //get data before routing to page
//             runGuardsAndResolvers:'always'   //allow re-load of the component to refresh it.
//         },
//         { 
//             path: ':websiteId/purchase/:purchaseId', 
//             component: PurchaseComponent,
//             resolve: {purchase: PurchaseResolver}
//         }
// ]

const routes: Routes = [  
        {
            path: '',
            component: WebsitesComponent
        },
        {
            path: ':id/detail', 
            component: WebsiteDetailComponent, 
            resolve: {website: WebsiteDetailResolver},  //get data before routing to page
            runGuardsAndResolvers:'always'   //allow re-load of the component to refresh it.
        },
        { 
            path: ':websiteId/purchase/:purchaseId', 
            component: PurchaseComponent,
            resolve: {purchase: PurchaseResolver},
            children: [
                {
                    path: '',
                    redirectTo: 'main',
                    pathMatch: 'full'
                },                
                {
                    path: 'main',
                    component: PurchaseMainComponent
                },
                {
                    path: 'notes',
                    component: PurchaseNotesComponent
                }                
                
            ]
        }
]

@NgModule({
imports: [
    CurrencyMaskModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    A2Edatetimepicker,
    RouterModule.forChild(routes),
    SharedModule
    
  ],
  declarations: [
    WebsitesComponent,
    WebsiteDetailComponent,
    PurchaseComponent,
    PurchaseMainComponent,
    PurchaseNotesComponent
  ],
  
  providers: [
    {   provide: CURRENCY_MASK_CONFIG, 
        useValue: CustomCurrencyMaskConfig               
    }
    , WebsiteService
    , ProductSaveService
]

})
export class WebsitesModule { }
