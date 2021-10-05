import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {SortingDataService} from '../../shared/services/sorting-data.service';

@Component({
  selector: 'app-media-nav-content',
  templateUrl: './media-nav-content.component.html',
  styleUrls: ['./media-nav-content.component.scss'],
})
export class MediaNavComponent implements OnInit {
  public title: string;

  constructor(
    private router: ActivatedRoute,
    private sortingDataService: SortingDataService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((route: Params) => {
      const description = route.description.split('_').join(' ');
      const type = route.type === 'movie' ? 'movies' : 'serials';

      this.title = `${type} ${description}`;
      this.sortingDataService.queryType(route.type, route.description);
    });
  }
}
