import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userName: string;
  public password: string;
  public userEmail: string;
}
