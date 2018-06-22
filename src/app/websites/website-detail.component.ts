import { Component, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { WebsiteService } from '../websites/website.service';
import { IWebsite, Website } from './iwebsite';
import { NgForm } from '@angular/forms';
import { IMessage, Message } from '../shared/imessage';


@Component({
    templateUrl: './website-detail.component.html',
    styleUrls: ['./website-detail.component.css']
})

export class WebsiteDetailComponent implements OnDestroy {
  
    website: IWebsite;
    wasSubmitted: boolean = false;
    navigationSubscription;
    popup : IMessage;

    constructor(  private route: ActivatedRoute,
                  private router: Router,
                  private websiteService: WebsiteService){
                      
                  this.navigationSubscription = this.router.events.subscribe((e: any) => {
                        // If it is a NavigationEnd event, then re-initalise the component
                        if (e instanceof NavigationEnd) {
                            this.initializeWebsiteDetail();
                        }
                    });  //navigationSubscription
                        
    } //constructor

    initializeWebsiteDetail(){    
        this.route.paramMap.subscribe(params => {

            //refresh these properties:
            this.website = new Website();
            this.wasSubmitted = false;  

            //get the website
            let id = +params.get('id');
            this.getWebsite(id);
        });
    }

    getWebsite(websiteID: number): void
    {
        if (websiteID == 0)
        {
            this.website = new Website();
        }
        else
        {
            this.websiteService.getWebsiteById(websiteID)
                .subscribe(website => 
                        {
                            this.website = website;
                            window.scrollTo(0, 0);
                        },
                        error => 
                        {
                            this.popup = new Message('alert', 'Sorry, an error occurred while getting the website.', "", 0);   
                            window.scrollTo(0, 0);
                            
                        });

        }
    }//getWebsite      

    openWebsite(): void{
        if (this.website.url && this.website.url.length > 0) {
            let win=window.open(this.website.url, '_blank');
        }
    }
  
    deleteIt(): void{        
        this.popup = new Message('confirm', 'Are sure you want to delete this website and all it\'s purchases ?', "onComplete", 0);       
    }
    
    // onCompleteTwo(): void{       
    //     this.router.navigate(['/websites']);        
    // }

    onComplete(event:any):void {
        //if they confirm in the message-component dialog launched by this.deleteIt();
        this.websiteService.deleteWebsite(this.website.websiteID)
                    .subscribe(val => 
                                {                                                            
                                    //show success msg for 3 sec then route back to websites list
                                    //works this.popup = new Message('alert', 'Delete was successful!', "onCompleteTwo");
                                    this.popup = new Message('timedAlert', 'Delete was successful!', "", 1000);
                                    setTimeout (() => {
                                        this.router.navigate(['/websites']);
                                    }, 1000);  
                                },
                                error => 
                                {
                                    this.popup = new Message('alert', 'Sorry, an error occurred while deleting the website.', "", 0);                                     
                                }
                    );//subscribe
    }//onComplete
    
    saveIt(websiteForm: NgForm): void{

        this.wasSubmitted = true;
        if (!websiteForm.valid)
            return;

        this.websiteService.saveWebsite(this.website)
            .subscribe(webserviceWebsiteID => 
                    {
                   
                        if (!webserviceWebsiteID) {
                            this.saveWebsiteError();
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
                    error => this.saveWebsiteError()
                            
                ); //subscribe

    }//save it

    saveWebsiteError() : void {
        this.popup = new Message('alert', 'Sorry, an error occurred while saving the website.', "", 0);     
        window.scrollTo(0, 0);
    }
     ngOnDestroy() {
            // !important - avoid memory leaks caused by navigationSubscription 
            if (this.navigationSubscription) {  
                this.navigationSubscription.unsubscribe();
            }
     }

  }//class
  

