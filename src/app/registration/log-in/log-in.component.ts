import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoriteService} from 'src/app/shared/services/favorite.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {userEnterAction} from '../../shared/store/reducers/user';
import {logInLeave} from '../../shared/store/reducers/authBlock';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public form: FormGroup;
  public errorMessage = '';
  public preLoader = false;

  constructor(
    public favoriteService: FavoriteService,
    private loginHttp: HttpClient,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  submit(): void {
    this.preLoader = true;

    this.loginHttp
      .post(
        'https://search-movie-server.herokuapp.com/api/auth/login',
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
          this.store.dispatch(logInLeave());
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.preLoader = false;
        }
      );
  }
}
