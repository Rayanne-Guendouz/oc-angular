import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {
  userEmail: string = "your@email.com";
  constructor(private rooter:Router){

  }
  onContinue():void{
    this.rooter.navigateByUrl("facesnaps");
  }

  onSubmitForm(forms:NgForm):void{
    console.log(forms.value);
  }


}
