import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  public open = false;
  public movieId: number | string;
  public seriesId = '';

  constructor() {}
}
