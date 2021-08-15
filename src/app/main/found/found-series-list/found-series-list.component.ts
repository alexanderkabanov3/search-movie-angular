import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/services/find-value.service';

@Component({
  selector: 'app-found-series-list',
  templateUrl: './found-series-list.component.html',
  styleUrls: ['./found-series-list.component.scss'],
})
export class FoundSeriesListComponent implements OnInit, OnDestroy {
  public quantityPages = [];
  public pagesExist = true;
  public pageMatch: number;
  public routerObservable;
  @ViewChild('pageItem') pageItems: ElementRef;

  constructor(public findServise: findValueService, private router: Router) {}

  ngOnInit(): void {
    this.countPages();
    this.pageMatch = +window.location.pathname.match(/\d+/)[0];

    this.routerObservable = this.router.events.subscribe((e: any) => {
      if (
        e.url !== undefined &&
        e.url.match(/\bseries\b/) &&
        e.url.match(/\bfound\b/)
      ) {
        const collection = this.pageItems.nativeElement.children;

        for (const item of collection) {
          item.classList.remove('found__pagesSeries--active');
          if (item.innerText === e.url.match(/\d+/)[0]) {
            item.classList.add('found__pagesSeries--active');
          }
        }
      }
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy() {
    this.routerObservable.unsubscribe();
  }

  countPages() {
    let pages = this.findServise.seriesArr.length;
    pages = pages / 10;
    if (pages % 10 !== 0) {
      pages = Math.ceil(pages);
    }

    if (pages < 2) {
      this.pagesExist = false;
    }

    this.quantityPages = Array(pages)
      .fill(0)
      .map((x, i) => i);
  }

  switchPage(event: any) {
    if (!event.target.classList.contains('found__pagesSeries')) {
      const pagesList = event.target.parentNode.children;
      for (const item of pagesList) {
        item.classList.remove('found__pagesSeries--active');
      }

      event.target.classList.add('found__pagesSeries--active');
    }
  }
}
