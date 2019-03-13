import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public searchName$ = new Subject<string>();
  title: string;
  searchNameText: string;

  constructor(private route: ActivatedRoute) { 
    this.searchName$.subscribe( v =>
      this.searchNameText = v
    )
  }

  ngOnInit(){
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
  }

}
