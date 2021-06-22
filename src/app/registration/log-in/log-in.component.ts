import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataService} from 'src/app/services/user-data.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public form: FormGroup;
  public password: string = '';
  public userName: string = '';

  constructor(private userData: UserDataService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  submit() {
    this.userData.userName = this.form.value.username;
    this.userData.password = this.form.value.password;
    localStorage.setItem('userName', this.form.value.username);
    this.router.navigate(['']);
  }
}
