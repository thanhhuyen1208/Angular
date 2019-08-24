import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../userDTO';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserDTO[];

  constructor( 
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  delete(user: UserDTO): void{
    this.users = this.users.filter(u => u !==user);
    this.userService.deleteUser(user).subscribe();
  }

}
