import { Component, OnChanges, Input } from "@angular/core";
import { WebsiteService } from '../services/website.service';


@Component({
    selector: 'debug-msgs',  //<debug-msgs [inErrorMessage]='debugMessages'></debug-msgs>
                             //where parent contains property 'debugMessages'
    templateUrl: './debug.component.html',
    styleUrls: ['./debug.component.css']

})

export class DebugComponent implements OnChanges {

    @Input() inErrorMessage: string = '';   //comes from parent component
    errors: string = '';                    //debug component html binds to this to display it.

    shouldShowErrors: boolean = true;  //this is the main switch for showing debug errors.

    constructor(  private websiteService: WebsiteService) { }    

    ngOnChanges(): void {

        if (this.shouldShowErrors == false)
            return;

        //if (this.inErrorMessage != 'undefined' && this.inErrorMessage.length > 0)
        if (this.inErrorMessage != 'undefined')
        {       

            if(this.shouldShowErrors)
            {
                if (this.inErrorMessage.length == 0)
                    this.clear();
                else if (this.errors.length == 0) 
                    this.errors = `${this.inErrorMessage}`; 
                else 
                    this.errors = `${this.errors}; ${this.inErrorMessage}`;                
            }
        }
    }

    clear(): void{
        this.errors = '';
    }

    closeIt(): void{
        this.clear();
    }
}