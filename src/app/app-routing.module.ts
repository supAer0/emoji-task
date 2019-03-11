import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LikedComponent } from './liked/liked.component';
import { DeletedComponent } from './deleted/deleted.component';

const routes: Routes = [
  {
    path: 'all',
    component: HomeComponent
  },
  {
    path: 'liked',
    component: LikedComponent
  },
  {
    path: 'deleted',
    component: DeletedComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
