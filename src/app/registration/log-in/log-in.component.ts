import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FavoriteService} from 'src/app/services/favorite.service';
import {UserDataService} from 'src/app/services/user-data.service';
import {HttpClient} from '@angular/common/http';
import {RegistrationService} from '../../services/registration.service';

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
    private userData: UserDataService,
    public favoriteService: FavoriteService,
    private loginHttp: HttpClient,
    private registrationService: RegistrationService
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
          this.userData.userName = this.form.value.name;
          localStorage.setItem('userName', this.form.value.name);
          localStorage.setItem('token', observer.token);
          this.registrationService.logInBtn = false;
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
