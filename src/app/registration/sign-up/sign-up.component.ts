import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataService} from 'src/app/services/user-data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, DoCheck {
  public form: FormGroup;
  public confirm = true;

  constructor(private userData: UserDataService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmpassword: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngDoCheck() {
    if (this.form.errors !== null || this.form.value.confirmpassword === '') {
      this.confirm = false;
    } else {
      this.confirm = true;
    }
  }

  password(formGroup: FormGroup) {
    const {value: password} = formGroup.get('password');
    const {value: confirmPassword} = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : {passwordNotMatch: true};
  }

  submit() {
    this.userData.userName = this.form.value.username;
    this.userData.password = this.form.value.password;
    localStorage.setItem('userName', this.form.value.username);
    this.router.navigate(['']);
  }
}
