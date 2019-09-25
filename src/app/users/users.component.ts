import { Component, OnInit } from '@angular/core';
import { UserDTO } from '../userDTO';
import { UserService } from '../user.service';
import { SelectItem, MenuItem, DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/api';
import { DataViewModule } from 'primeng/dataview';
import { DropdownModule } from 'primeng/primeng';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { ActivatedRoute } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService, MessageService]
})
export class UsersComponent implements OnInit {

  checked: boolean;
  visibleSidebar1;
  users: UserDTO[];
  cols: any[];
  display: any;
  selectedUser: UserDTO;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  itemsUser: MenuItem[];
  itemsBook: MenuItem[];

  currentModalUserId: UserDTO;
  tr: { firstDayOfWeek: number; };

  constructor(
    private userService: UserService,
    public dialogService: DialogService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.itemsBook = [{
      label: 'Books',
      icon: 'ti ti-book',
    }],

      this.itemsUser = [{
        label: 'Users',
        icon: 'ti ti-user',
      },
      ];

    this.getUsers();

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'email', header: 'Email' },
      { field: 'fullName', header: 'Full Name' },
      { field: 'birthday', header: 'Birthday' },
      { field: 'role', header: 'Role/Roles' },
      { field: 'enable', header: 'Actived' }
    ];
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  delete(user: UserDTO): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
    this.messageService.clear('c');
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

  public saveUsername: String;

  public onSaveUsernameChanged(id: String) {
    this.saveUsername = id;
  }

  showConfirm(userId: UserDTO) {
    this.currentModalUserId = userId;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'warn', summary:'Are you sure?', detail:'Confirm to proceed'});
}

onReject() {
  this.messageService.clear('c');
}

}

