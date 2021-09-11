import {HttpClient} from '@angular/common/http';
import {Component, DoCheck, OnInit} from '@angular/core';
import {TrailerService} from 'src/app/services/trailer.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {MediaItem, Results} from 'src/app/interfaces/fetchingResults';

@Component({
  selector: 'app-sectionupcomming',
  templateUrl: './sectionupcomming.component.html',
  styleUrls: ['./sectionupcomming.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SectionupcommingComponent implements OnInit, DoCheck {
  public bgImgPath: string;
  public trailerArr: MediaItem[] = [];
  private urlTrailers =
    'https://api.themoviedb.org/3/movie/upcoming?api_key=f4a143e6e64636aa4b0cd6bec7236ad4';
  private movieUrl =
    'https://api.themoviedb.org/3/movie/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&page=1';
  public modal = false;

  constructor(
    private bgHttp: HttpClient,
    private trailerHttp: HttpClient,
    private posterHttp: HttpClient,
    private trailerService: TrailerService
  ) {}

  ngOnInit(): void {
    this.trailerService.movieId = '';
    this.trailerService.seriesId = '';
    this.trailerService.open = false;
    // fetching background image
    this.bgHttp.get(this.movieUrl).subscribe((response: Results) => {
      this.bgImgPath = `https://image.tmdb.org/t/p/original${
        response.results[this.randomInteger()].backdrop_path
      }`;
    });
    // fetching upcoming list
    this.trailerHttp.get(this.urlTrailers).subscribe((response: Results) => {
      response.results.forEach((element: MediaItem) => {
        this.posterHttp
          .get(
            `https://api.themoviedb.org/3/movie/${element.id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&append_to_response=videos`
          )
          .subscribe((response: MediaItem) => {
            this.trailerArr.push(response);
          });
      });
    });
  }

  ngDoCheck(): void {
    this.modal = this.trailerService.open;
  }

  open(event): void {
    this.trailerService.movieId = event;
    this.trailerService.open = true;
  }

  randomInteger(): number {
    const rand = 0 - 0.5 + Math.random() * (19 + 1);
    return Math.round(rand);
  }
}
