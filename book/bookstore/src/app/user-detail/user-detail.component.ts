import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../userDTO';
import { SelectItem } from 'primeng/primeng';
import { DataViewModule } from 'primeng/dataview';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  @Input() user: UserDTO;
  selectedUser: UserDTO;
  displayDialog: boolean;
  sortOptions: SelectItem[];
  sortKey: string;
  sortField: string;
  sortOrder: number;
  checked: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
    //private user: UserDTO
    
    
  ) { }

  ngOnInit() {
    this.getUser();
    this.sortOptions = [
      { label: 'ID', value: 'id' },
      { label: 'Email', value: 'email' },
      { label: 'Full Name', value: 'fullName' }
    ];
  }

  getUser(): void{
    const id =+this.route.snapshot.paramMap.get('id');

    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }


}
