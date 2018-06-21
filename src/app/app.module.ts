import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';



import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { WebsitesComponent } from './websites/websites.component';
import { WebsiteDetailComponent } from './websites/website-detail.component';
import { PurchaseComponent } from './websites/purchase.component';
import { CurrencyMaskModule } from "ng2-currency-mask"; 
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { AngularFontAwesomeModule } from 'angular-font-awesome';  //https://fontawesome.com/how-to-use/svg-with-js
import { DebugComponent } from './shared/debug.component';
import { MessageComponent } from './shared/message.component';




export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ".",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: ","
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WebsitesComponent,
    WebsiteDetailComponent,
    PurchaseComponent,
    MessageComponent,
    DebugComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    CurrencyMaskModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    A2Edatetimepicker

    
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
