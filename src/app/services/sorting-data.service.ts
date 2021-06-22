import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SortingDataService {
  public genres = '';
  public sortValue = ' ';

  constructor() {}
}
