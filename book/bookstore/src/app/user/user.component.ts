import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../userDTO';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: UserDTO;
  users: UserDTO[]

  constructor( 
    private userService: UserService,
    private router: ActivatedRoute,

    ) { }

   ngOnInit() {
     //this.getUser();
     this.getUsers();
   }

  // getUser(): void {
  //   const id = +this.router.snapshot.paramMap.get('id');
  //   this.userService.getUser(id).subscribe(user => this.user = user);
  // }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users)
  }
}
