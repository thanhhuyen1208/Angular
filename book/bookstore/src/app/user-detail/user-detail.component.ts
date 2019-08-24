import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../userDTO';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  
  @Input() user: UserDTO;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    //private user: UserDTO
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(): void{
    const id =+this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

}
