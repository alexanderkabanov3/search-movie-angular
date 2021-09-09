import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserDataService} from 'src/app/services/user-data.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, DoCheck {
  public form: FormGroup;
  public confirm = true;
  public errorMessage = '';

  constructor(
    private userData: UserDataService,
    private router: Router,
    private userRegister: HttpClient
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        email: new FormControl('', [Validators.email, Validators.required]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        passwordConfirm: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      {
        validators: this.password.bind(this),
      }
    );
  }

  ngDoCheck(): void {
    this.form.errors !== null || this.form.value.passwordConfirm === ''
      ? (this.confirm = false)
      : (this.confirm = true);
  }

  password(formGroup: FormGroup): null | object {
    const {value: password} = formGroup.get('password');
    const {value: passwordConfirm} = formGroup.get('passwordConfirm');
    return password === passwordConfirm ? null : {passwordNotMatch: true};
  }

  submit(): void {
    this.userRegister
      .post(
        'https://search-movie-server.herokuapp.com/api/auth/signup',
        this.form.value
      )
      .subscribe(
        (observer: any) => {
          this.userData.userName = this.form.value.name;
          localStorage.setItem('userName', this.form.value.name);
          localStorage.setItem('token', observer.token);

          this.router.navigate(['']);
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
