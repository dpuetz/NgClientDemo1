import { Component,  OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IPurchase, Purchase } from './ipurchase'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WebsiteService } from '../websites/website.service';
import { NgForm } from '@angular/forms';
import { IMessage, Message } from '../shared/imessage';


@Component({
  templateUrl: './purchase-notes.component.html',
//   styleUrls: ['./purchase.component.css']
})


export class PurchaseNotesComponent  implements OnInit {

    @ViewChild(NgForm) productForm: NgForm;

    purchase: IPurchase = new Purchase();

    constructor (private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.parent.data.subscribe(
            data => this.purchase = data['purchase']
        );

    }
    
} //class