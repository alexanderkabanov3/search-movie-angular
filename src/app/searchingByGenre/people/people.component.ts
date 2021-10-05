import {HttpClient} from '@angular/common/http';
import {Component, OnInit, HostListener} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class PeopleComponent implements OnInit {
  public preLoader = true;
  public resArr = [];
  public knownArr = [];
  public pages = 2;
  public btn = true;

  constructor(private peopleList: HttpClient) {}

  ngOnInit(): void {
    this.fetchingPeopleList().then(() => {
      for (let item of this.resArr) {
        let list = '';

        for (let e of item.known_for) {
          if (e.title) {
            list = `${e.title}, ${list}`;
          } else if (e.name) {
            list = `${e.name}, ${list}`;
          }
        }

        this.knownArr.push(list);
      }

      setTimeout(() => {
        this.preLoader = false;
      }, 500);
    });
  }

  async fetchingPeopleList(): Promise<any> {
    const peopleUrl =
      'https://api.themoviedb.org/3/person/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US';

    const peopleRes: any = await this.peopleList.get(peopleUrl).toPromise();

    this.resArr = peopleRes.results;
  }

  load() {
    this.newItem().then(() => {
      for (let item of this.resArr) {
        let list = [];
        for (let e of item.known_for) {
          list.push(e);
        }

        this.knownArr.push(list.join(', '));
      }
    });
  }

  async newItem(): Promise<any> {
    const peopleUrl = `https://api.themoviedb.org/3/person/popular?api_key=f4a143e6e64636aa4b0cd6bec7236ad4&language=en-US&page=${this.pages}`;

    const peopleRes: any = await this.peopleList.get(peopleUrl).toPromise();

    peopleRes.results.forEach((element) => {
      this.resArr.push(element);
    });

    this.pages++;
    if (this.pages == 450) {
      this.btn = false;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.pages > 2 && this.pages <= 450) {
      if (
        window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 150
      ) {
        this.load();
      }
    }
  }
}
