import {HttpClient} from '@angular/common/http';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {MediaItem, Results} from 'src/app/shared/interfaces/fetchingResults';
import {Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import {
  dataReceivedStream,
  trailerLeaveAction,
  trailerOpenAction,
  trailerStream,
} from '../../shared/store/reducers/trailer';
import {TrailerService} from '../../shared/services/trailer.service';
import {BackgroundImagesService} from 'src/app/shared/services/background-images.service';

@Component({
  selector: 'app-sectionupcomming',
  templateUrl: './sectionupcomming.component.html',
  styleUrls: ['./sectionupcomming.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SectionupcommingComponent implements OnInit, OnDestroy {
  public bgImgPath$ = this.bgImgService.sectionUpcomingImg$;
  public trailerArr: MediaItem[] = [];
  private urlTrailers =
    'https://api.themoviedb.org/3/movie/upcoming?api_key=f4a143e6e64636aa4b0cd6bec7236ad4';
  public modal = false;
  private trailerStream$ = this.store.select(trailerStream);
  private dataReceived$ = this.store.select(dataReceivedStream);
  private trailerSubscription$: Subscription;
  private dataReceivedSubscription$: Subscription;

  constructor(
    private trailerHttp: HttpClient,
    private posterHttp: HttpClient,
    private store: Store,
    private trailerService: TrailerService,
    private bgImgService: BackgroundImagesService
  ) {}

  ngOnInit(): void {
    this.trailerSubscription$ = this.trailerStream$.subscribe((trailer) => {
      this.modal = trailer.open;
    });

    this.bgImgService.findSectionUpcomingBgImg();

    // fetching upcoming list

    this.trailerHttp
      .get<Results>(this.urlTrailers)
      .subscribe((response: Results) => {
        response.results.forEach((element: MediaItem) => {
          this.posterHttp
            .get<MediaItem>(
              `https://api.themoviedb.org/3/movie/${element.id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&append_to_response=videos`
            )
            .subscribe((trailers: MediaItem) => {
              if (trailers.videos.results[0] !== undefined) {
                this.trailerArr.push(trailers);
              }
            });
        });
      });
  }

  open(id: number): void {
    this.trailerService.fetchTrailer(id, 'movie');

    this.dataReceivedSubscription$ = this.dataReceived$.subscribe((data) => {
      if (data) {
        this.store.dispatch(trailerOpenAction());
        this.dataReceivedSubscription$.unsubscribe();
      }
    });
  }

  ngOnDestroy(): void {
    this.store.dispatch(trailerLeaveAction());
    this.trailerSubscription$.unsubscribe();
  }
}
