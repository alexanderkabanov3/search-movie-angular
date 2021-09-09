import {
  Component,
  DoCheck,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import {UserDataService} from '../services/user-data.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {FavoriteService} from '../services/favorite.service';
import {NavigationEnd, Router} from '@angular/router';
import {RouteService} from '../services/route.service';

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
export class HeaderComponent implements OnInit, DoCheck {
  public checkedIn = false;
  public userName = 'UserName';
  @ViewChild('menuHeader') menuHeader: ElementRef;
  @ViewChild('burgerContent') burgerContent: ElementRef;

  constructor(
    private userData: UserDataService,
    public favoriteService: FavoriteService,
    private router: Router,
    private routesArray: RouteService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.routesArray.routes.push(event.url);

        if (event.url === '/login' && localStorage.getItem('userName') !== '') {
          this.router.navigate([
            this.routesArray.routes[this.routesArray.routes.length - 2],
          ]);
        }
      }
    });

    const userName = localStorage.getItem('userName');

    if (userName !== null && userName.trim()) {
      this.userName = userName;
      this.checkedIn = true;
    }
  }

  ngDoCheck(): void {
    if (this.userData.userName !== undefined && this.userData.userName.trim()) {
      this.userName = this.userData.userName;
      this.checkedIn = true;
    }
  }

  logOut(): void {
    this.checkedIn = false;
    this.userData.userName = '';
    localStorage.setItem('userName', '');
    localStorage.setItem('token', '');
    this.favoriteService.btnExist = false;
    window.localStorage.setItem(
      'btnExist',
      JSON.stringify(this.favoriteService.btnExist)
    );
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
}
