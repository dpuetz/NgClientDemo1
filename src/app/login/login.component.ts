import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './iuser';
import { IMessage, Message } from '../shared/imessage';
import { WebsiteService } from '../websites/website.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css']
})

export class LoginComponent implements OnInit {

    model: IUser;
    submitted: boolean = false;
    popup : IMessage;
    self = this;
    hasError:boolean=false;

    constructor( private router: Router,
                 private websiteService: WebsiteService ) { }

    ngOnInit() {
        this.model = {username:'Guest', password:'Password'};
    }
    
    loginIn(loginForm: NgForm): void {   
        this.submitted = true;
        if (!loginForm.valid)
            return;

        this.websiteService.doLogin(this.model)
            .subscribe(val => 
                {
                    this.router.navigate(['/websites']);
                },
                error => 
                {                
                    if (this.hasError == false)  //they will see this error twice if I don't prevent the second time with this.
                    {
                        this.hasError = true;                    
                        this.popup = new Message('alert', 'Since this is a demo, I\'ll login for you.', "onComplete", 0);   
                    }
                }); //subscribe   


    }//loginIn

    onComplete(event:any):void{
        this.router.navigate(['/websites']);
    }

}//class



