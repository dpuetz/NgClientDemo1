import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WebsitesComponent } from './websites/websites.component';
import { LoginComponent } from './login/login.component';
import { WebsiteDetailComponent } from './websites/website-detail.component';
import { PurchaseComponent } from './purchase/purchase.component';

const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: 'websites', component: WebsitesComponent }, 
  { path: 'websites/:id/detail', component: WebsiteDetailComponent, runGuardsAndResolvers:'always' },
  { path: 'websites/:websiteId/purchase/:purchaseId', component: PurchaseComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: '**', component: LoginComponent },

];

@NgModule({
    imports: [ RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule { }
