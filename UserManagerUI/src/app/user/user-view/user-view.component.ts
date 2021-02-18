import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from '../user.service';
import * as moment from 'moment';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  dataSource = new MatTableDataSource<User>();
  users: User[];
  displayHeaders = ['name', 'surname', 'age'];
  totalAge: number = 0;
  averageAge: number = 0;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getRefreshUsers();

    this.userSubscription = this.userService.getUserSubject().subscribe(data => {
      console.log('Users updated', data);
      this.getRefreshUsers();
    });
  }

  calcAge(dateOfBirth: Date): number {
    if (dateOfBirth) {
      return moment().diff(dateOfBirth, 'years');
    }
  }

  getRefreshUsers() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      if (data.length > 0) {
        this.users = data.sort((a, b) => a.surname.toLowerCase().localeCompare(b.surname.toLowerCase()));

        this.users.forEach(element => {
          element.age = this.calcAge(element.dateOfBirth);
          this.totalAge += element.age;
        });

        this.averageAge = Math.floor(this.totalAge / this.users.length);
        this.dataSource.data = this.users;
      }

    }), (err) => {
      console.log(err);
    };
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
