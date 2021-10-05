import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {FavoriteService} from '../../shared/services/favorite.service';
import {Store} from '@ngrx/store';
import {
  loggedInSelector,
  usernameSelector,
} from '../../shared/store/reducers/user';

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
  public id: number;
  public bgImgPath: string;
  public preLoader = true;
  public item;
  public known = [];
  public commentsAmount = 0;
  public commentsArray = [];
  public comment = '';
  public currentUser$ = this.store.select(usernameSelector);
  public checkedIn$ = this.store.select(loggedInSelector);

  constructor(
    private httpMovie: HttpClient,
    private httpCredits: HttpClient,
    private postComment: HttpClient,
    private getAllCommentsHttp: HttpClient,
    private deleteCommentHttp: HttpClient,
    public favoriteService: FavoriteService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.id = +window.location.pathname.match(/\d+/)[0];

    this.getAllComments();

    this.fetchItem(this.id);
  }

  fetchItem(id: number): void {
    this.httpMovie
      .get(
        `https://api.themoviedb.org/3/person/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US`
      )
      .subscribe((data: any) => {
        this.item = data;
        this.bgImgPath = `https://image.tmdb.org/t/p/original${this.item.profile_path}`;

        this.searchMovies(this.item.imdb_id);
      });
  }

  searchMovies(id: number): void {
    this.httpCredits
      .get(
        `https://api.themoviedb.org/3/find/${id}?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&external_source=imdb_id`
      )
      .subscribe(({person_results}: any) => {
        if (person_results.length !== 0) {
          this.known = person_results[0].known_for;
        }

        setTimeout(() => {
          this.preLoader = false;
        }, 500);
      });
  }

  leaveComment(): void {
    const comObj = {
      text: this.comment,
      userName: localStorage.getItem('userName'),
    };

    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.postComment
      .post(
        `https://search-movie-server.herokuapp.com/api/comments/personoverview/${this.id}`,
        comObj,
        {
          headers: header,
        }
      )
      .subscribe(
        (observer: any) => {
          if (observer.status === 'success') {
            this.getAllComments();
          }
        },
        (error) => {
          console.log(error);
        }
      );

    this.comment = '';
  }

  getAllComments(): void {
    this.getAllCommentsHttp
      .get(
        `https://search-movie-server.herokuapp.com/api/comments/personoverview/${this.id}`
      )
      .subscribe(
        (observer: any) => {
          this.commentsArray = observer.data.reverse();
          this.commentsAmount = this.commentsArray.length;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteComment(event: number): void {
    const token = `Bearer ${localStorage.getItem('token')}`;
    const header = new HttpHeaders().set('Authorization', token);

    this.deleteCommentHttp
      .delete(
        `https://search-movie-server.herokuapp.com/api/comments/personoverview/${this.id}/${event}`,
        {
          headers: header,
        }
      )
      .subscribe(
        (observer: any) => {
          if (observer.status === 'success') {
            this.getAllComments();
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
