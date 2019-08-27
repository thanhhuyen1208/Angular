import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../userDTO';
import { UserService } from '../user.service';
import { SelectItem } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/primeng';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: UserDTO[];
  cols: any[];
  selectedUser: UserDTO;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  checked: boolean;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();

    this.cols = [
      { field: 'id', header: 'ID' },
      {field: 'email', header: 'Email' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'birthday', header: 'Birthday' },
      { field: 'role', header:'Role/Roles'}
  ];

    this.sortOptions = [
      { label: 'ID', value: 'id' },
      { label: 'Email', value: 'email' },
      { label: 'Full Name', value: 'fullName' }
    ];

  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  delete(user: UserDTO): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }


  selectUser(event: Event, user: UserDTO) {
    this.selectedUser = user;
    this.displayDialog = true;
    event.preventDefault();
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  loadData(event){
  }


}
