import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  public userName: string;
  public password: string;
  public userEmail: string;
}
