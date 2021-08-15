import {Component, OnInit} from '@angular/core';
import {findValueService} from '../services/find-value.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public preLoader = false;

  constructor(public findService: findValueService) {}

  ngOnInit(): void {
    this.findService.preLoader.subscribe((observer: any) => {
      this.preLoader = observer;
    });
  }
}
