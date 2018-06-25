import { Component,  OnInit, ViewChild } from '@angular/core';
import { IPurchase } from './ipurchase'
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  templateUrl: './purchase-notes.component.html',
})


export class PurchaseNotesComponent  implements OnInit {

    @ViewChild(NgForm) purchaseForm: NgForm;

     purchase: IPurchase;

    constructor (private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.parent.data.subscribe(
            data => {
                        this.purchase = data['purchase'];
                        // if (this.purchaseForm) {            //probably not needed here, because they can't add a new purchase without going back to the website-detail component.
                        //     this.purchaseForm.reset();
                        // }
                    }
        );//subscribe

    }//ngOnInit
    
} //class