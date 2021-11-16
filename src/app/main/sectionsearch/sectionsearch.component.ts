import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {findValueService} from 'src/app/shared/services/find-value.service';
import {animate, style, transition, trigger} from '@angular/animations';
import {BackgroundImagesService} from 'src/app/shared/services/background-images.service';

@Component({
  selector: 'app-sectionsearch',
  templateUrl: './sectionsearch.component.html',
  styleUrls: ['./sectionsearch.component.scss'],
  animations: [
    trigger('item', [
      transition(':enter', [style({opacity: 0}), animate('850ms ease-out')]),
    ]),
  ],
})
export class SectionsearchComponent implements OnInit {
  public bgImgPath$ = this.BgImgService.sectionSearchImg$;
  public findValue: string;

  constructor(
    private findService: findValueService,
    private router: Router,
    private BgImgService: BackgroundImagesService
  ) {}

  ngOnInit(): void {
    this.BgImgService.findSectionSearchBgImg();
  }

  find(): void {
    if (this.findValue === undefined) {
      this.findService.findValue = 'zxccxzzxccxz';
    } else {
      this.findService.findValue = this.findValue;
    }

    window.localStorage.setItem('searchValue', this.findService.findValue);

    this.findService.nav$.subscribe((value) => {
      if (value === 'empty') {
        setTimeout(() => {
          this.router.navigate(['/found']);
        }, 500);
      } else {
        setTimeout(() => {
          this.router.navigate(['/found', value, 'page', 1]);
        }, 500);
      }
    });

    this.findService.startSearching();
  }
}
