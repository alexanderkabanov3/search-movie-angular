import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrailerService {
  public open = new Subject<boolean>();
  public movieId: number | string;
  public seriesId = '';

  constructor() {}
}
