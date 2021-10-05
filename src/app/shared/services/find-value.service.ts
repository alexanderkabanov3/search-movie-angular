import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class findValueService {
  public findValue: string;
  public movieArr = JSON.parse(window.localStorage.getItem('movieArr'));
  public seriesArr = JSON.parse(window.localStorage.getItem('seriesArr'));
  public peopleArr = JSON.parse(window.localStorage.getItem('peopleArr'));

  public movieFlag = JSON.parse(window.localStorage.getItem('movieFlag'));
  public seriesFlag = JSON.parse(window.localStorage.getItem('seriesFlag'));
  public peopleFlag = JSON.parse(window.localStorage.getItem('peopleFlag'));

  public notFound: boolean;
  public preLoader = new Subject();

  public nav$ = new Subject();

  constructor(
    private search: HttpClient,
    private searchTotalPages: HttpClient
  ) {}

  startSearching(): void {
    this.preLoader.next(true);

    this.fetchingData().then((data) => {
      const allArr: any = [];

      if (data !== undefined) {
        data.forEach((element: any) => {
          if (element.results === undefined) {
            allArr.push(element);
          } else {
            element.results.forEach((item: any) => {
              allArr.push(item);
            });
          }
        });
      }

      const movArr = allArr.filter((e: any) => e.media_type === 'movie');
      const serArr = allArr.filter((e: any) => e.media_type === 'tv');
      const peoArr = allArr.filter((e: any) => e.media_type === 'person');

      this.movieArr = movArr;
      this.seriesArr = serArr;
      this.peopleArr = peoArr;

      window.localStorage.setItem('movieArr', JSON.stringify(this.movieArr));
      window.localStorage.setItem('seriesArr', JSON.stringify(this.seriesArr));
      window.localStorage.setItem('peopleArr', JSON.stringify(this.peopleArr));

      if (movArr.length === 0 && serArr.length === 0 && peoArr.length === 0) {
        this.nav$.next('empty');
      } else {
        if (movArr.length >= serArr.length && movArr >= peoArr) {
          this.nav$.next('movies');

          this.movieFlag = true;
          this.seriesFlag = false;
          this.peopleFlag = false;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.peopleFlag)
          );
        } else if (serArr.length > movArr.length && serArr >= peoArr) {
          this.nav$.next('series');

          this.seriesFlag = true;
          this.movieFlag = false;
          this.peopleFlag = false;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.peopleFlag)
          );
        } else if (peoArr.length > movArr.length && peoArr > serArr) {
          this.nav$.next('people');

          this.peopleFlag = true;
          this.seriesFlag = false;
          this.movieFlag = false;

          window.localStorage.setItem(
            'movieFlag',
            JSON.stringify(this.movieFlag)
          );
          window.localStorage.setItem(
            'seriesFlag',
            JSON.stringify(this.seriesFlag)
          );
          window.localStorage.setItem(
            'peopleFlag',
            JSON.stringify(this.peopleFlag)
          );
        }
      }
    });
  }

  async fetchingData(): Promise<any> {
    this.findValue = window.localStorage.getItem('searchValue');

    const searchValue = `https://api.themoviedb.org/3/search/multi?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&query=${this.findValue}`;
    let totalResArray: any = [];

    const mainRes: any = await this.search.get(searchValue).toPromise();

    if (mainRes.total_results === 0) {
      this.notFound = true;
    } else if (mainRes.total_pages > 1) {
      this.notFound = false;
      for (let i = 1; i <= mainRes.total_pages; i++) {
        const totalRes = await this.searchTotalPages
          .get(`${searchValue}&page=${i}`)
          .toPromise();
        totalResArray.push(totalRes);

        if (i === 10) {
          break;
        }
      }

      return totalResArray;
    } else {
      this.notFound = false;
      totalResArray = mainRes.results;

      return totalResArray;
    }
  }
}
