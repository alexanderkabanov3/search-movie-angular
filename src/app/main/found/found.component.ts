import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {findValueService} from 'src/app/services/find-value.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss'],
})
export class FoundComponent implements OnInit {
  public notFound = false;
  public preLoader = true;

  constructor(
    public findService: findValueService,
    private search: HttpClient,
    private searchTotalPages: HttpClient
  ) {}

  ngOnInit(): void {
    this.findService.getValue(localStorage.getItem('searchingValue'));
    this.fetchingData().then((data) => {
      const allArr: any = [];

      if (data === undefined) {
        this.notFound = true;

        setTimeout(() => {
          this.preLoader = false;
        }, 1000);
      } else {
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

      this.findService.getMovieArr(
        allArr.filter((e: any) => e.media_type === 'movie')
      );
      this.findService.getSeriesArr(
        allArr.filter((e: any) => e.media_type === 'tv')
      );
      this.findService.getPeopleArr(
        allArr.filter((e: any) => e.media_type === 'person')
      );

      setTimeout(() => {
        this.preLoader = false;
      }, 500);
    });
  }

  async fetchingData(): Promise<any> {
    const searchValue = `https://api.themoviedb.org/3/search/multi?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&query=${this.findService.findValue}`;
    let totalResArray: any = [];

    const mainRes: any = await this.search.get(searchValue).toPromise();

    if (mainRes.total_results === 0) {
      this.notFound = true;
    } else if (mainRes.total_pages > 1) {
      for (let i = 1; i <= mainRes.total_pages; i++) {
        let totalRes = await this.searchTotalPages
          .get(`${searchValue}&page=${i}`)
          .toPromise();
        totalResArray.push(totalRes);

        if (i == 10) {
          break;
        }
      }

      return totalResArray;
    } else {
      totalResArray = mainRes.results;

      return totalResArray;
    }
  }
}
