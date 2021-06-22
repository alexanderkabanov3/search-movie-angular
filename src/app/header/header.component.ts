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
  public quantityEvents = [];
  @ViewChild('menuHeader') menuHeader: ElementRef;
  @ViewChild('burgerContent') burgerContent: ElementRef;

  constructor(private userData: UserDataService) {}

  ngOnInit(): void {
    const userName = localStorage.getItem('userName');

    if (userName !== null && userName.trim()) {
      this.userName = userName;
      this.checkedIn = true;
    }
  }

  ngDoCheck() {
    if (this.userData.userName !== undefined && this.userData.userName.trim()) {
      this.userName = this.userData.userName;
      this.checkedIn = true;
    }
  }

  logOut() {
    this.checkedIn = false;
    this.userData.userName = '';
    localStorage.setItem('userName', '');
  }

  burger_click() {
    if (this.burgerContent.nativeElement.classList.contains('burger-open')) {
      this.burgerContent.nativeElement.classList.remove('burger-open');
      this.menuHeader.nativeElement.classList.remove('burger-open');
    } else {
      this.burgerContent.nativeElement.classList.add('burger-open');
      this.menuHeader.nativeElement.classList.add('burger-open');
    }
  }

  @HostListener('window:click', ['$event.target'])
  emptyCLick(event) {
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
