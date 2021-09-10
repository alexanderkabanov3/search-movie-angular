import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userName = localStorage.getItem('userName');
}
