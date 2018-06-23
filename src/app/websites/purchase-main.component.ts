import { Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPurchase, Purchase } from './ipurchase'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WebsiteService } from '../websites/website.service';
import { NgForm } from '@angular/forms';
import { IMessage, Message } from '../shared/imessage';


@Component({
  templateUrl: './purchase-main.component.html',
})

export class PurchaseMainComponent  implements OnInit {

    @ViewChild(NgForm) productForm: NgForm;

    purchase: IPurchase = new Purchase();
    a2eOptions: any = {format: 'M/D/YYYY'};

    constructor (private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.parent.data.subscribe(
            data => this.purchase = data['purchase']
        );

    }
    
} //class