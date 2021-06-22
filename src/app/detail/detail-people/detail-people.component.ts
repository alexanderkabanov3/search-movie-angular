import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-detail-people',
  templateUrl: './detail-people.component.html',
  styleUrls: ['./detail-people.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class DetailPeopleComponent implements OnInit {
  public bgImgPath: string;
  public preLoader = true;
  public item;
  public known = [];

  constructor(private httpMovie: HttpClient, private httpCredits: HttpClient) {}

  ngOnInit(): void {
    const movId = window.location.pathname.match(/\d+/)[0];

    this.fetchItem(movId).then((data: any) => {
      this.item = data;
      this.bgImgPath = `https://image.tmdb.org/t/p/original${this.item.profile_path}`;

      this.searchMovies(this.item.imdb_id).then((data: any) => {
        if (data.person_results.length !== 0) {
          this.known = data.person_results[0].known_for;
        }

        setTimeout(() => {
          this.preLoader = false;
        }, 500);
      });
    });
  }

  async fetchItem(id) {
    const fetch = await this.httpMovie
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .toPromise();

    return fetch;
  }

  async searchMovies(id) {
    const fetch = await this.httpCredits
      .get(
        `https://api.themoviedb.org/3/find/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&external_source=imdb_id`
      )
      .toPromise();

    return fetch;
  }
}
