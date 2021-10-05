import {Component, OnInit, OnDestroy} from '@angular/core';
import {SortingDataService} from 'src/app/shared/services/sorting-data.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {MediaItem} from '../../../shared/interfaces/fetchingResults';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-media-content',
  templateUrl: './media-content.component.html',
  styleUrls: ['./media-content.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class MediaContentComponent implements OnInit, OnDestroy {
  public moviesArr: Array<MediaItem> = [];
  public btnExist$ = this.sortService.btnExist;
  public noResults$ = this.sortService.noResults;
  public preLoader$ = this.sortService.preLoader$;
  private genres: string;
  private option = 'popularity.desc';
  public type: string;

  private mediaArrSubscription: Subscription;
  private sortServiceSubscription: Subscription;

  public barValue = 25;
  public titleFontSize = '15';
  public outerStrokeWidth = 5;
  public unitsFontSize = '12';

  constructor(
    private sortService: SortingDataService,
    private breakpointObserver: BreakpointObserver,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.mediaArrSubscription = this.sortService.mediaResults$.subscribe(
      (mediaArr) => {
        this.moviesArr = mediaArr;
      }
    );

    this.router.params.subscribe((route) => {
      this.type = route.type;
    });

    this.sortServiceSubscription = this.sortService.sortStream$.subscribe(
      (option) => {
        this.sortService.pages = 1;
        this.sortService.genres = option.genres;
        this.sortService.option = option.option;
        this.sortService.moviesArr = [];
        this.preLoader$.next(true);

        this.sortService.fetchFilteredList(
          this.sortService.type,
          option.genres,
          option.option
        );
      }
    );

    this.mediaQueries();
  }

  load(): void {
    this.sortService.load();
  }

  mediaQueries(): void {
    this.breakpointObserver
      .observe(['(max-width: 790px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 20;
          this.titleFontSize = '12';
          this.outerStrokeWidth = 4;
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 650px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 17;
          this.titleFontSize = '10';
          this.outerStrokeWidth = 4;
          this.unitsFontSize = '10';
        }
      });

    this.breakpointObserver
      .observe(['(max-width: 510px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.barValue = 20;
          this.titleFontSize = '12';
          this.outerStrokeWidth = 4;
          this.unitsFontSize = '12';
        }
      });
  }

  ngOnDestroy(): void {
    this.mediaArrSubscription.unsubscribe();
    this.sortServiceSubscription.unsubscribe();
  }
}
