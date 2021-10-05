import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FavoriteService} from '../../shared/services/favorite.service';
import {Store} from '@ngrx/store';
import {userEnterAction} from '../../shared/store/reducers/user';
import {logInLeave, signUpLeave} from '../../shared/store/reducers/authBlock';

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
    private userRegister: HttpClient,
    private favoriteService: FavoriteService,
    private store: Store
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
          this.store.dispatch(
            userEnterAction({username: this.form.value.name})
          );

          localStorage.setItem('userName', this.form.value.name);
          localStorage.setItem('loggedIn', JSON.stringify(true));
          localStorage.setItem('token', observer.token);
          this.store.dispatch(signUpLeave());
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.preLoader = false;
        }
      );
  }
}
