import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {MainComponent} from './main/main.component';
import {SectionsearchComponent} from './main/sectionsearch/sectionsearch.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SectionpopularComponent} from './main/sectionpopular/sectionpopular.component';
import {SectionupcommingComponent} from './main/sectionupcomming/sectionupcomming.component';
import {SectiontopratedComponent} from './main/sectiontoprated/sectiontoprated.component';
import {NgCircleProgressModule} from 'ng-circle-progress';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PipesModule} from './pipes/pipes.module';
import {TrailerModule} from './trailer/trailer.module';
import {FavoriteModule} from './header/favorite/favorite.module';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    SectionsearchComponent,
    SectionpopularComponent,
    SectionupcommingComponent,
    SectiontopratedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgCircleProgressModule.forRoot({
      backgroundColor: '#000',
      radius: 30,
      maxPercent: 100,
      units: ' %',
      unitsColor: '#FFF',
      outerStrokeWidth: 1,
      outerStrokeColor: '#FFFFFF',
      innerStrokeColor: '#FFFFFF',
      titleColor: '#fff',
      subtitleColor: '#FFF',
      showSubtitle: false,
      showInnerStroke: false,
      startFromZero: false,
    }),
    BrowserAnimationsModule,
    PipesModule,
    TrailerModule,
    FavoriteModule,
    LayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
