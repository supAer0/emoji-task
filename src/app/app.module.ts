import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatTableModule, MatPaginatorModule, MatButtonModule } from '@angular/material';

import { SatPopoverModule } from '@ncstate/sat-popover';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { TableComponent } from './table/table.component';
import { HomeComponent } from './home/home.component';
import { LikedComponent } from './liked/liked.component';
import { DeletedComponent } from './deleted/deleted.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    TableComponent,
    HomeComponent,
    LikedComponent,
    DeletedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    BrowserAnimationsModule,
    SatPopoverModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
