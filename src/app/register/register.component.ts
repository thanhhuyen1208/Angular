import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';
import { first } from 'rxjs/operators';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading: boolean =  false;
  submitted: boolean = false;
  argree_term: boolean ;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authServicce: AuthService,
    private userService: UserService,
    private messageService: MessageService

  ) {
    if (this.authServicce.currentUserValue){
      this.router.navigate(['/']);
    }
  } 

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      re_pass:['', Validators.required],
      argree_term:['true', Validators.required],
      email: ['',Validators.required],
      password: ['', Validators.required]
    });
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted=  true;

    //stop here if form invalid
    if(this.registerForm.invalid){
      return;
    }

    this.loading  = true;
    this.authServicce.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
          data => {
            this.messageService.add("Successful")
            this.router.navigate(['/login']);
          },
          error => {
            this.messageService.add('Failed');
            this.loading = false;
            this.router.navigate(['/register']);
          }
        )

  }

}
