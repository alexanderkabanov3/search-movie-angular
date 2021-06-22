import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/services/find-value.service';
import {animate, style, transition, trigger} from '@angular/animations';

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
  private resObj: any;
  public bgImgPath: string = '';
  public findValue = '';

  constructor(
    private bgHttp: HttpClient,
    private findService: findValueService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bgHttp.get(this.movieUrl).subscribe((response) => {
      this.resObj = response;

      this.bgImgPath = `https://image.tmdb.org/t/p/original${
        this.resObj.results[this.randomInteger()].backdrop_path
      }`;
    });
  }

  find(): void {
    localStorage.setItem('searchingValue', this.findValue);
    this.findService.getValue(this.findValue);
    this.router.navigate(['/found', 'movies', 'page', 1]);
  }

  randomInteger() {
    let rand = 0 - 0.5 + Math.random() * (19 - 0 + 1);
    return Math.round(rand);
  }
}
