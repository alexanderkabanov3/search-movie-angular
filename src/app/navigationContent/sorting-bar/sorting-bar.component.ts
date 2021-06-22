import {HttpClient} from '@angular/common/http';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SortingDataService} from 'src/app/services/sorting-data.service';

export interface sortData {
  genres: Array<string>;
  sortValue: string;
}

@Component({
  selector: 'app-sorting-bar',
  templateUrl: './sorting-bar.component.html',
  styleUrls: ['./sorting-bar.component.scss'],
})
export class SortingBarComponent implements OnInit {
  private genresUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`;
  public genreArr = [];
  public btnDisabled = true;

  @ViewChild('sortOption') sortOption: ElementRef;
  @ViewChild('sorting') sorting: ElementRef;

  constructor(
    private httpGenre: HttpClient,
    private sortSrvice: SortingDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchGenre().then((data: any) => {
      data.genres.forEach((element) => {
        this.genreArr.push(element);
      });
    });

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

  async fetchGenre() {
    const genreList = await this.httpGenre.get(this.genresUrl).toPromise();
    return genreList;
  }

  select(event) {
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

  selectOption(event) {
    if (event.target.value !== 'popularity.desc') {
      this.btnDisabled = false;
    } else {
      this.btnDisabled = true;
    }

    const list = document.querySelectorAll('.sortingBar__genre');
    list.forEach((e) => {
      if (e.classList.contains('sortingBar__genre--selected')) {
        this.btnDisabled = false;
      }
    });
  }

  sendData() {
    this.sortSrvice.genres = '';
    this.sortSrvice.sortValue = '';

    const list = document.querySelectorAll('.sortingBar__genre');
    const arr = [];
    list.forEach((e: any) => {
      if (e.classList.contains('sortingBar__genre--selected')) {
        arr.push(e.id);
      }
    });
    this.sortSrvice.genres = arr.join(',');

    const children = this.sorting.nativeElement.children;
    for (const item of children) {
      if (item.selected) {
        this.sortSrvice.sortValue = item.value;
      }
    }
  }
}
