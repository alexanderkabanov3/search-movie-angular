import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-series-nav-content',
  templateUrl: './series-nav-content.component.html',
  styleUrls: ['./series-nav-content.component.scss'],
})
export class SeriesNavContentComponent implements OnInit {
  public title = '';

  constructor(private router: Router) {}

  ngOnInit() {
    if (window.location.pathname === '/series/popular') {
      this.title = 'Popular series';
    } else if (window.location.pathname === '/series/airing') {
      this.title = 'On the air';
    } else if (window.location.pathname === '/series/tv') {
      this.title = 'On TV';
    } else if (window.location.pathname === '/series/rated') {
      this.title = 'Top rated series';
    }

    this.router.events.subscribe((event: any) => {
      if (event.url === '/series/popular') {
        this.title = 'Popular series';
      } else if (event.url === '/series/airing') {
        this.title = 'On the air';
      } else if (event.url === '/series/tv') {
        this.title = 'On TV';
      } else if (event.url === '/series/rated') {
        this.title = 'Top rated series';
      }
    });
  }
}
