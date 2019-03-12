import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: 'all', component: HomeComponent, data: {type: 'all'} },
  { path: 'liked', component: HomeComponent, data: {type: 'like'} },
  { path: 'deleted', component: HomeComponent, data: {type: 'delete'} },
  { path: '**', redirectTo: 'all' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
