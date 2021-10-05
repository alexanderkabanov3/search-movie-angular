import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {FavoriteService} from '../shared/services/favorite.service';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  loggedInSelector,
  userLeaveAction,
  usernameSelector,
} from '../shared/store/reducers/user';
import {
  logInBlock,
  logInEnter,
  logInLeave,
  signUpBlock,
  signUpEnter,
  signUpLeave,
} from '../shared/store/reducers/authBlock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('650ms ease-out')]),
      transition(':leave', [
        style({opacity: 1}),
        animate(
          550,
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public checkedIn$ = this.store.select(loggedInSelector);
  public userName$ = this.store.select(usernameSelector);
  public signUpBlock$ = this.store.select(signUpBlock);
  public logInBlock$ = this.store.select(logInBlock);
  public confirmation = false;
  private userSubscription: Subscription;
  @ViewChild('menuHeader') menuHeader: ElementRef;
  @ViewChild('burgerContent') burgerContent: ElementRef;

  constructor(public favoriteService: FavoriteService, private store: Store) {}

  ngOnInit(): void {}

  logOut(): void {
    this.store.dispatch(userLeaveAction());

    localStorage.setItem('userName', null);
    localStorage.setItem('loggedIn', JSON.stringify(false));
    localStorage.setItem('token', '');
    this.confirmation = false;
  }

  burger_click(): void {
    if (this.burgerContent.nativeElement.classList.contains('burger-open')) {
      this.burgerContent.nativeElement.classList.remove('burger-open');
      this.menuHeader.nativeElement.classList.remove('burger-open');
    } else {
      this.burgerContent.nativeElement.classList.add('burger-open');
      this.menuHeader.nativeElement.classList.add('burger-open');
    }
  }

  @HostListener('window:click', ['$event.target'])
  emptyCLick(event: HTMLElement): void {
    if (
      !event.classList.contains('flex') &&
      !event.classList.contains('menu') &&
      !event.classList.contains('header__userName')
    ) {
      this.burgerContent.nativeElement.classList.remove('burger-open');
      this.menuHeader.nativeElement.classList.remove('burger-open');
    }
  }

  @HostListener('window:click', ['$event.target'])
  emptySignUpCLick(event: HTMLElement): void {
    if (event.classList.contains('modal')) {
      this.store.dispatch(signUpLeave());
      this.store.dispatch(logInLeave());
      this.confirmation = false;
    }
  }

  logIn(): void {
    this.store.dispatch(logInEnter());
  }

  signUp(): void {
    this.store.dispatch(signUpEnter());
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
