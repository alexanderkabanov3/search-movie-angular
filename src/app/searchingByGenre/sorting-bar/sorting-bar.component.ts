import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SortingDataService} from 'src/app/shared/services/sorting-data.service';

interface ItemGenre {
  id: number;
  name: string;
}

interface Genres {
  genres: Array<ItemGenre>;
}

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit {
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`;
  public genreArr: Array<ItemGenre>;
  public btnDisabled = true;

  @ViewChild('sortOption') sortOption: ElementRef;
  @ViewChild('sorting') sorting: ElementRef;

  constructor(
    private httpGenre: HttpClient,
    private sortService: SortingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchGenre();

    this.router.events.subscribe((event) => {
      const list = document.querySelectorAll('.sortingBar__genre');

      list.forEach((e: any) => {
        e.classList.remove('sortingBar__genre--selected');
      });

      const children = this.sorting.nativeElement.children;
      for (const item of children) {
        item.removeAttribute('selected');
      }
      this.sortOption.nativeElement.setAttribute('selected', 'selected');
      this.btnDisabled = true;
    });
  }

  fetchGenre(): void {
    this.httpGenre.get(this.genresUrl).subscribe((genre: Genres) => {
      this.genreArr = genre.genres;
    });
  }

  select(event): void {
    if (!event.target.classList.contains('sortingBar__genresBlock')) {
      event.target.classList.contains('sortingBar__genre--selected')
        ? event.target.classList.remove('sortingBar__genre--selected')
        : event.target.classList.add('sortingBar__genre--selected');

      const children = event.target.parentNode.children;

      let count = 0;

      for (const item of children) {
        if (item.classList.contains('sortingBar__genre--selected')) {
          count++;
        }
      }

      if (count > 0) {
        this.btnDisabled = false;
      } else if (this.sortOption.nativeElement.selected) {
        this.btnDisabled = true;
      }
    }
  }

  selectOption(event: Event): void {
    const input = event.target as HTMLInputElement;

    input.value !== 'popularity.desc'
      ? (this.btnDisabled = false)
      : (this.btnDisabled = true);

    const list = document.querySelectorAll('.sortingBar__genre');
    list.forEach((e) => {
      if (e.classList.contains('sortingBar__genre--selected')) {
        this.btnDisabled = false;
      }
    });
  }

  sendData(): void {
    const list = document.querySelectorAll('.sortingBar__genre');
    const arr = [];
    list.forEach((e: any) => {
      if (e.classList.contains('sortingBar__genre--selected')) {
        arr.push(e.id);
      }
    });

    const children = this.sorting.nativeElement.children;
    for (const item of children) {
      if (item.selected) {
        this.sortService.sortStream$.next({
          option: item.value,
          genres: arr.join(','),
        });
      }
    }
  }
}
