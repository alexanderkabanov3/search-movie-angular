import {Component, OnInit} from '@angular/core';
import {findValueService} from 'src/app/services/find-value.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-movie-content',
  templateUrl: './movie-content.component.html',
  styleUrls: ['./movie-content.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class MovieContentComponent implements OnInit {
  public itemArr: any = [];
  public movieFlag = true;
  public seriesFlag = true;
  public peopleFlag = true;
  public knownArr = [];

  constructor(
    public findService: findValueService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params: Params) => {
      this.itemArr = [];
      let totalArr;

      if (this.findService.movieFlag) {
        totalArr = this.findService.movieArr;
        this.seriesFlag = false;
        this.movieFlag = true;
        this.peopleFlag = false;
      } else if (this.findService.seriesFlag) {
        totalArr = this.findService.seriesArr;
        this.seriesFlag = true;
        this.movieFlag = false;
        this.peopleFlag = false;
      } else {
        totalArr = this.findService.peopleArr;
        this.seriesFlag = false;
        this.movieFlag = false;
        this.peopleFlag = true;
      }

      let pageNumber = +params.page;

      if (pageNumber == 1) {
        pageNumber = 0;
      } else {
        pageNumber = (pageNumber - 1) * 10;
      }

      const end = pageNumber + 9;

      for (pageNumber; pageNumber <= end; pageNumber++) {
        if (totalArr[pageNumber] !== undefined) {
          this.itemArr.push(totalArr[pageNumber]);
        }
      }

      if (this.itemArr[0].known_for !== undefined && this.peopleFlag) {
        this.itemArr.forEach((element) => {
          const together = [];
          element.known_for.forEach((e) => {
            if (e.original_title !== undefined) {
              together.push(e.original_title);
            }
          });

          this.knownArr.push(together.join(', '));
        });
      }
    });
  }
}
