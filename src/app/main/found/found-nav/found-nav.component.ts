import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/services/find-value.service';

@Component({
  selector: 'app-found-nav',
  templateUrl: './found-nav.component.html',
  styleUrls: ['./found-nav.component.scss'],
})
export class FoundNavComponent implements OnInit, AfterViewInit {
  public moiveFlag = true;
  public seriesFlag = true;
  public peopleFlag = true;

  constructor(public findService: findValueService, private router: Router) {}

  ngOnInit(): void {
    const movieSearch = /\bmovies\b/;
    const seriesSearch = /\bseries\b/;

    if (window.location.pathname.match(movieSearch) !== null) {
      this.findService.movieFlag = true;
      this.findService.seriesFlag = false;
      this.findService.peopleFlag = false;

      this.moiveFlag = true;
      this.seriesFlag = false;
      this.peopleFlag = false;
    } else if (window.location.pathname.match(seriesSearch) !== null) {
      this.findService.movieFlag = false;
      this.findService.seriesFlag = true;
      this.findService.peopleFlag = false;

      this.moiveFlag = false;
      this.seriesFlag = true;
      this.peopleFlag = false;
    } else {
      this.findService.movieFlag = false;
      this.findService.seriesFlag = false;
      this.findService.peopleFlag = true;

      this.moiveFlag = false;
      this.seriesFlag = false;
      this.peopleFlag = true;
    }

    this.router.events.subscribe((e: any) => {
      if (e.url !== undefined) {
        if (e.url.match(/\bmovies\b/) !== null) {
          this.findService.movieFlag = true;
          this.findService.seriesFlag = false;
          this.findService.peopleFlag = false;
        } else if (e.url.match(/\bseries\b/) !== null) {
          this.findService.movieFlag = false;
          this.findService.seriesFlag = true;
          this.findService.peopleFlag = false;
        } else {
          this.findService.movieFlag = false;
          this.findService.seriesFlag = false;
          this.findService.peopleFlag = true;
        }
      }
    });
  }

  ng;

  ngAfterViewInit() {
    const movieSearch = /\bmovies\b/;
    const seriesSearch = /\bseries\b/;
    const peopleSearch = /\bpeople\b/;

    this.router.events.subscribe((path: any) => {
      if (path.url !== undefined) {
        if (path.url.match(movieSearch) !== null) {
          this.moiveFlag = true;
          this.seriesFlag = false;
          this.peopleFlag = false;
        }
        if (path.url.match(seriesSearch) !== null) {
          this.moiveFlag = false;
          this.seriesFlag = true;
          this.peopleFlag = false;
        }
        if (path.url.match(peopleSearch) !== null) {
          this.moiveFlag = false;
          this.seriesFlag = false;
          this.peopleFlag = true;
        }
      }
    });
  }

  selectType(event: any) {
    if (!event.target.classList.contains('found__nav')) {
      if (
        event.target.classList.contains('found__personCount') ||
        event.target.classList.contains('found__seriesCount') ||
        event.target.classList.contains('found__movieCount')
      ) {
        const childrenArr = event.target.parentNode.parentNode.children;
        for (const item of childrenArr) {
          item.classList.remove('found__tab--active');
        }
        event.target.parentNode.classList.add('found__tab--active');
      } else {
        const childrenArr = event.target.parentNode.children;
        for (const item of childrenArr) {
          item.classList.remove('found__tab--active');
        }
        event.target.classList.add('found__tab--active');
      }
    }
  }

  chooseMovie() {
    this.findService.movieFlag = true;
    this.findService.seriesFlag = false;
    this.findService.peopleFlag = false;
  }

  chooseSeries() {
    this.findService.movieFlag = false;
    this.findService.seriesFlag = true;
    this.findService.peopleFlag = false;
  }

  choosePeople() {
    this.findService.movieFlag = false;
    this.findService.seriesFlag = false;
    this.findService.peopleFlag = true;
  }
}
