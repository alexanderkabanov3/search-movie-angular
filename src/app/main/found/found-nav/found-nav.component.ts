import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/services/find-value.service';

@Component({
  selector: 'app-found-nav',
  templateUrl: './found-nav.component.html',
  styleUrls: ['./found-nav.component.scss'],
})
export class FoundNavComponent implements OnInit {
  private route;

  constructor(public findService: findValueService, private router: Router) {}

  ngOnInit(): void {
    this.route = this.router.events.subscribe((e: any) => {
      if (e.url !== undefined) {
        if (e.url.match(/\bmovies\b/) !== null) {
          this.findService.movieFlag = true;
          this.findService.seriesFlag = false;
          this.findService.peopleFlag = false;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.findService.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.findService.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.findService.peopleFlag)
          );
        } else if (e.url.match(/\bseries\b/) !== null) {
          this.findService.movieFlag = false;
          this.findService.seriesFlag = true;
          this.findService.peopleFlag = false;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.findService.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.findService.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.findService.peopleFlag)
          );
        } else {
          this.findService.movieFlag = false;
          this.findService.seriesFlag = false;
          this.findService.peopleFlag = true;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.findService.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.findService.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.findService.peopleFlag)
          );
        }
      }
    });
  }
}
