import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  today = new Date();

  role: String;
  
  constructor(

    private authService: AuthService
  ) { 

  }

  ngOnInit() {
    
  }
  checkLogin():boolean{
    return this.authService.isLoggedIn();
  }

  getRole(){
    this.role = this.authService.getRole();
  }

}
