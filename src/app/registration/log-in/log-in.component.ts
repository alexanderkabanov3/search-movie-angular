import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NavigationEnd, NavigationStart, Router} from '@angular/router';
import {FavoriteService} from 'src/app/services/favorite.service';
import {UserDataService} from 'src/app/services/user-data.service';
import {HttpClient} from '@angular/common/http';
import {RouteService} from '../../services/route.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  public form: FormGroup;
  public password = '';
  public userName = '';
  public errorMessage = '';

  constructor(
    private userData: UserDataService,
    private router: Router,
    public favoriteService: FavoriteService,
    private loginHttp: HttpClient,
    private routesArray: RouteService
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
          this.router.navigate([
            this.routesArray.routes[this.routesArray.routes.length - 2],
          ]);

          this.favoriteService.btnExist = true;

          window.localStorage.setItem(
            'btnExist',
            JSON.stringify(this.favoriteService.btnExist)
          );
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
  }
}
