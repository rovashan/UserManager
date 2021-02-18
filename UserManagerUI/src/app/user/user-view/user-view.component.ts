import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user';
import { UserService } from '../user.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit {
  users: User[];
  displayHeaders = ['name', 'surname', 'age'];
  totalAge: number = 0;
  averageAge: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.users = data.sort((a,b) => a.surname.toLowerCase().localeCompare(b.surname.toLowerCase()));
      
      this.users.forEach(element => {
        element.age = this.calcAge(element.dateOfBirth);
        this.totalAge += element.age;
      });

      this.averageAge = Math.floor(this.totalAge/this.users.length);
      console.log(this.users);
    })
  }

  calcAge(dateOfBirth: Date): number {
    if (dateOfBirth) {
      return moment().diff(dateOfBirth, 'years');
    }
  }

}
