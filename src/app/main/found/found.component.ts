import {Component, OnInit} from '@angular/core';
import {findValueService} from 'src/app/services/find-value.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.component.html',
  styleUrls: ['./found.component.scss'],
})
export class FoundComponent implements OnInit {
  public notFound = false;

  constructor(public findService: findValueService) {}

  ngOnInit(): void {
    this.notFound = this.findService.notFound;
  }
}
