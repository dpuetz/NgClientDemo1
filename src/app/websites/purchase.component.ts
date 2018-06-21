import { Component,  OnDestroy } from '@angular/core';
import { IPurchase, Purchase } from './ipurchase'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WebsiteService } from '../websites/website.service';
import { NgForm } from '@angular/forms';
import { IMessage, Message } from '../shared/imessage';


@Component({
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})

export class PurchaseComponent implements  OnDestroy {

    purchase: IPurchase;
    websiteName: string;
    websiteId: number;
    wasSubmitted: boolean;
    popup : IMessage;
    navigationSubscription;
    a2eOptions: any = {format: 'M/D/YYYY'};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private websiteService: WebsiteService
    ) { 
            this.navigationSubscription = this.router.events.subscribe((e: any) => {
                // If it is a NavigationEnd event, then re-initalise the component
                if (e instanceof NavigationEnd) {
                    this.initializePurchaseDetail();
                }
            });  
    }//constructor

    initializePurchaseDetail(){    //serves as the onInit function
        this.route.paramMap.subscribe(params => {

            this.websiteName = '';
            this.websiteId = 0;
            this.wasSubmitted = false; 

            let purchaseId = +params.get('purchaseId');
            this.websiteId = +params.get('websiteId'); 

            this.purchase = new Purchase();
            this.purchase.websiteID = this.websiteId;

            this.getWebsite(this.websiteId);
            this.getPurchase(this.websiteId, purchaseId);
        });

    }//initializePurchaseDetail


    getPurchase(websiteId: number, purchaseId: number): void { 
       
        if (! websiteId || websiteId == 0) {
            this.router.navigate(['/websites']);
        }
        else if (purchaseId == 0) {
            this.purchase = new Purchase();
        }
        else {
            this.websiteService.getPurchase(websiteId, purchaseId)
                .subscribe(purchase => 
                    {
                        this.purchase = purchase;
                        window.scrollTo(0, 0);
                    },
                    error => {
                        this.popup = new Message('alert', 'Sorry, an error has occurred', "", 0); 
                        window.scrollTo(0, 0);
                    });    
        } //if

    }//getPurchase

    getWebsite(websiteID: number): void  //just to get the website name
    {
        if (websiteID == 0)
        {
            this.router.navigate(['/websites']);   
        }
        else
        {
            this.websiteService.getWebsiteById(websiteID)
                .subscribe(website => 
                        {
                            this.websiteName = website.websiteName;                            
                        },
                        error => 
                        {
                            //don't show any errors here.                            
                        });
        }
    }  //getWebsite  

    onComplete(event:any):void {
        //if they confirm in the message-component dialog launched by this.deleteIt();
                this.websiteService.deletePurchase(this.purchase.purchaseID, this.websiteId)
                .subscribe(val => 
                            {                                                              
                                    //show success msg for 1 sec and route back to the website
                                    this.popup = new Message('timedAlert', 'Delete was successful!', "", 1000);
                                    setTimeout (() => {
                                        this.router.navigate(['/websites', this.websiteId, 'detail' ]);    
                                    }, 1000);  
                                },
                                error => 
                                {
                                    this.popup = new Message('alert', 'Sorry, an error occurred while deleting the purchase.', "", 0);                                     
                                }
                    );//subscribe
    }//onComplete    
    
    deleteIt(): void{
        this.popup = new Message('confirm', 'Are sure you want to delete this purchase?', "onComplete", 0);       
    }

    saveIt(purchaseForm: NgForm): void{

var obj = this.purchase;
var str = JSON.stringify(obj, null, 4); 
console.log(str); 

        this.wasSubmitted = true;
        if (!purchaseForm.valid)
        {
            return;
        }

        
        this.purchase.websiteID = this.websiteId; //website.id might not be there, so add it here for calling the webservice.
        this.websiteService.savePurchase(this.purchase)
            .subscribe(savedPurchase => 
                {
                    //now refresh the purchase with data from service. Probably not necessary.
                    this.purchase = savedPurchase;

                    //We now have to update the component with a reroute reroute back to this component or will might have problems: and the url still says id = 0, and more issues as user keeps adding new websites.
                    //Delay the re-route for a bit so user can see the saved message first.
                    this.popup = new Message('timedAlert', 'Save was successful!', "", 1000);

                    setTimeout (() => {
                        this.router.navigate(['/websites/', this.purchase.websiteID, 'purchase', this.purchase.purchaseID]); 
                    }, 1000);                  

                },
                error => 
                {
                    this.popup = new Message('alert', 'Sorry, an error occurred while saving the purchase.', "", 0);                                     

                }); //subscribe          
    }  //saveIt

     ngOnDestroy() {
            // !important - avoid memory leaks caused by navigationSubscription 
            if (this.navigationSubscription) {  
                this.navigationSubscription.unsubscribe();
            }
     }    



} //class
