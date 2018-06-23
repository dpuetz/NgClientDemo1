import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { WebsiteService } from '../websites/website.service';
import { IWebsite, Website } from './iwebsite';
import { NgForm } from '@angular/forms';
import { IMessage, Message } from '../shared/imessage';


@Component({
    templateUrl: './website-detail.component.html',
    styleUrls: ['./website-detail.component.css']
})

export class WebsiteDetailComponent {
  
    website: IWebsite = new Website();
    wasSubmitted: boolean = false;
    popup : IMessage;

    constructor(  private route: ActivatedRoute,
                  private router: Router,
                  private websiteService: WebsiteService){
    } //constructor

  ngOnInit() {
        
        this.route.data.subscribe(
            data => this.onResolved(data['website'])
        );

  }//ngOnInit

    /////////getting
    onResolved(website: IWebsite): void {
        if (website) {
            this.website = website;
        } else {
            this.website = new Website();
            this.popup = new Message('alert', 'Sorry, an error occurred while getting the website.', "", 0);   
        }
        window.scrollTo(0, 0);        
        
    } //onResolved
 
    /////////deleting
    deleteIt(): void{        
        this.popup = new Message('confirm', 'Are sure you want to delete this website and all it\'s purchases ?', "onComplete", 0);       
    }

    onComplete(event:any):void {
        //if they confirm in the message-component dialog launched by this.deleteIt();
        this.websiteService.deleteWebsite(this.website.websiteID)
                    .subscribe(val => 
                        {       
                            if (val)
                            {                                                     
                                //show success msg for 1 sec then route back to websites list
                                this.popup = new Message('timedAlert', 'Delete was successful!', "", 1000);
                                setTimeout (() => {
                                    this.router.navigate(['/websites']);
                                }, 1000);  
                            } else {
                                this.deleteError();
                            }
                        },
                        error => this.deleteError()

                    );//subscribe
    }//onConfirmDelete

    deleteError(): void {
        this.popup = new Message('alert', 'Sorry, an error occurred while deleting the website.', "", 0);
    }

    /////////saving
    saveIt(websiteForm: NgForm): void{

        this.wasSubmitted = true;
        if (!websiteForm.valid)
            return;

        this.websiteService.saveWebsite(this.website)
            .subscribe(webserviceWebsiteID => 
                    {
                   
                        if (webserviceWebsiteID === null) {
                            this.saveError();
                        } else {

                            //We now have to update the component with a reroute back to this component or will have problems: and the url still says id = 0, and more issues as user keeps adding new websites.
                            //Delay the re-route for a bit so user can see the saved message first.
                            this.popup = new Message('timedAlert', 'Save was successful!', "", 1000);

                            window.scrollTo(0, 0);
                            setTimeout (() => {
                               this.router.navigate(['/websites/', webserviceWebsiteID, 'detail']); 
                            }, 1000);  
                        }
                   
                    },
                    error => this.saveError()
                            
                ); //subscribe

    }//save it
  

    saveError() : void {
        this.popup = new Message('alert', 'Sorry, an error occurred while saving the website.', "", 0);     
        window.scrollTo(0, 0);
    }

    openWebsite(): void{
        if (this.website.url && this.website.url.length > 0) {
            let win=window.open(this.website.url, '_blank');
        }
    }

  }//class
  

