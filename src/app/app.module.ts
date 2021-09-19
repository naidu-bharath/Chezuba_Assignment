import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayComponent } from './ListPage/display.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { NgxSpinnerModule } from "ngx-spinner";
import {MatTabsModule} from '@angular/material/tabs';

import { MatPaginatorModule } from '@angular/material/paginator';
import { HighlightSearchPipe } from './ListPage/highlight-search.pipe';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    HighlightSearchPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,MatSortModule,
    HttpClientModule, MatTableModule,
    NgxSpinnerModule,MatTabsModule,
    MatPaginatorModule
  ],
  exports: [NgxSpinnerModule],
  providers: [NgxSpinnerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
