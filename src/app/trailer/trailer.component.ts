import {Component, OnInit} from '@angular/core';
import {
  TrailerObjInterface,
  TrailerService,
} from '../shared/services/trailer.service';
import {Store} from '@ngrx/store';
import {dataLeft, trailerLeaveAction} from '../shared/store/reducers/trailer';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss'],
})
export class TrailerComponent implements OnInit {
  public trailerObj: TrailerObjInterface;

  constructor(private trailerService: TrailerService, private store: Store) {}

  ngOnInit(): void {
    this.trailerObj = this.trailerService.trailerObj;
  }

  close(): void {
    this.store.dispatch(trailerLeaveAction());
    this.store.dispatch(dataLeft());
  }
}
