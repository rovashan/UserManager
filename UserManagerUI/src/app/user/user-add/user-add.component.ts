import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {
  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserAddComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dateOfBirth: ['', Validators.required]
    });
  }

  save() {
    var newUser: User = {
      name: this.userForm.get('name').value,
      surname: this.userForm.get('surname').value,
      dateOfBirth: this.userForm.get('dateOfBirth').value
    };

    this.userService.addUser(newUser).subscribe(data => {
      console.log('User added', data);
      this.userService.setUserSubject();
      this.dialogRef.close(data);
    }), (err) => {
      console.log(err);
    }
  }

  close() {
    this.dialogRef.close();
  }
}
