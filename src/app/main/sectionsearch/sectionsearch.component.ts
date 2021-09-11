import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/services/find-value.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {Results} from 'src/app/interfaces/fetchingResults';

@Component({
  selector: 'app-sectionsearch',
  templateUrl: './sectionsearch.component.html',
  styleUrls: ['./sectionsearch.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SectionsearchComponent implements OnInit {
  private movieUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&page=1';
  public bgImgPath: string;
  public findValue: string;

  constructor(
    private bgHttp: HttpClient,
    private findService: findValueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bgHttp.get<Results>(this.movieUrl).subscribe((response) => {
      this.bgImgPath = `https://image.tmdb.org/t/p/original${
        response.results[this.randomInteger()].backdrop_path
      }`;
    });
  }

  find(): void {
    if (this.findValue === undefined) {
      this.findService.findValue = 'zxccxzzxccxz';
    } else {
      this.findService.findValue = this.findValue;
    }

    window.localStorage.setItem('searchValue', this.findService.findValue);

    this.findService.startSearching();

    this.findService.nav$.subscribe((value) => {
      if (value === 'empty') {
        setTimeout(() => {
          this.router.navigate(['/found']);
        }, 500);
      } else {
        setTimeout(() => {
          this.router.navigate(['/found', value, 'page', 1]);
        }, 500);
      }
    });
  }

  randomInteger(): number {
    const rand = 0 - 0.5 + Math.random() * (19 + 1);
    return Math.round(rand);
  }
}
