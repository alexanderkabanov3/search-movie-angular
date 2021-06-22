import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class findValueService {
  public findValue: string = '';
  public movieArr = [];
  public seriesArr = [];
  public peopleArr = [];

  public movieFlag = true;
  public seriesFlag = false;
  public peopleFlag = false;

  getValue(text: string) {
    if (text === '') {
      this.findValue = 'zxccxzzxccxz';
    } else {
      this.findValue = text;
    }
  }

  getMovieArr(arr: any) {
    this.movieArr = arr;
  }

  getSeriesArr(arr: any) {
    this.seriesArr = arr;
  }

  getPeopleArr(arr: any) {
    this.peopleArr = arr;
  }
}
