import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { UserDTO } from '../userDTO';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  es: any;

    invalidDates: Array<Date>;
    minDate: Date;

    maxDate: Date;
    date11: Date;


  @Input()  user: UserDTO
  tr: { firstDayOfWeek: number; };

  constructor(
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute   

  ) { }

  ngOnInit() {
    this.getUser();
    
    this.es = {
      firstDayOfWeek: 1,
      dayNames: [ "domingo","lunes","martes","miércoles","jueves","viernes","sábado" ],
      dayNamesShort: [ "dom","lun","mar","mié","jue","vie","sáb" ],
      dayNamesMin: [ "D","L","M","X","J","V","S" ],
      monthNames: [ "enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre" ],
      monthNamesShort: [ "ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic" ],
      today: 'Hoy',
      clear: 'Borrar'
  }

  this.tr = {
      firstDayOfWeek : 1
  }

  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let prevMonth = (month === 0) ? 11 : month -1;
  let prevYear = (prevMonth === 11) ? year - 1 : year;
  let nextMonth = (month === 11) ? 0 : month + 1;
  let nextYear = (nextMonth === 0) ? year + 1 : year;
  this.minDate = new Date();
  this.minDate.setMonth(prevMonth);
  this.minDate.setFullYear(prevYear);
  this.maxDate = new Date();
  this.maxDate.setMonth(nextMonth);
  this.maxDate.setFullYear(nextYear);

  let invalidDate = new Date();
  invalidDate.setDate(today.getDate() - 1);
  this.invalidDates = [today,invalidDate];

  }

  getUser(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.userService.updateUser(this.user).subscribe(() => this.goBack() );
  }

//   handleChange(user) {
//     let isChecked = user.enable;
// }

}
