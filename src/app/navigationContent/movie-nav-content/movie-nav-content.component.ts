import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-nav-content',
  templateUrl: './movie-nav-content.component.html',
  styleUrls: ['./movie-nav-content.component.scss'],
})
export class MovieNavComponent implements OnInit {
  public title = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (window.location.pathname === '/movie/popular') {
      this.title = 'Popular movies';
    } else if (window.location.pathname === '/movie/playing') {
      this.title = 'Playing movies';
    } else if (window.location.pathname === '/movie/upcoming') {
      this.title = 'Upcoming movies';
    } else if (window.location.pathname === '/movie/trending') {
      this.title = 'Trending movies';
    }

    this.router.events.subscribe((event: any) => {
      if (event.url === '/movie/popular') {
        this.title = 'Popular movies';
      } else if (event.url === '/movie/playing') {
        this.title = 'Playing movies';
      } else if (event.url === '/movie/upcoming') {
        this.title = 'Upcoming movies';
      } else if (event.url === '/movie/trending') {
        this.title = 'Trending movies';
      }
    });
  }
}
