import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserDataService} from 'src/app/services/user-data.service';
import {HttpClient} from '@angular/common/http';
import {RegistrationService} from '../../services/registration.service';
import {FavoriteService} from '../../services/favorite.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit, DoCheck {
  public form: FormGroup;
  public confirm = true;
  public errorMessage = '';
  public preLoader = false;

  constructor(
    private userData: UserDataService,
    private userRegister: HttpClient,
    private registrationService: RegistrationService,
    private favoriteService: FavoriteService
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
    this.preLoader = true;
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
          this.registrationService.signUpBtn = false;
          this.favoriteService.btnExist = true;

          window.localStorage.setItem(
            'btnExist',
            JSON.stringify(this.favoriteService.btnExist)
          );
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.preLoader = false;
        }
      );
  }
}
