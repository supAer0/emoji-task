import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Emoji } from '../../models/emoji';
import { DataServiceService } from '../../services/data-service.service';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'url', 'preview', 'action'];
  tableData: Emoji[];
  dataSource = new MatTableDataSource();
  isLoading = false;
  type: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor (private dataSvc: DataServiceService, private route: ActivatedRoute) { }
  @Input() searchName$: Subject<string>;

  public like(emoji: Emoji) {
    this.dataSvc.likeEmoji(emoji);
    emoji.isLike = true;
  }

  public deleteFromTableData(emoji: Emoji) {
    let recIndex = this.tableData.findIndex(e => e.name === emoji.name);
    if (recIndex >= 0) {
      this.tableData.splice(recIndex, 1);
      this.searchName$.next('');
    }
  }

  public unDelete(emoji: Emoji) {
    this.dataSvc.unDeleteEmoji(emoji);
    this.deleteFromTableData(emoji);
  }

  public delete(emoji: Emoji) {
    if (emoji.isLike) {
      this.dataSvc.unLikeEmoji(emoji);
    }
    this.dataSvc.deleteEmoji(emoji);
    this.deleteFromTableData(emoji);
  }

  public deleteFromLikeList(emoji: Emoji) {
    this.dataSvc.unLikeEmoji(emoji);
    this.deleteFromTableData(emoji);
  }

  public searchByName(name: string) {
    if (name === '') {
      this.dataSource.data = this.tableData;
      this.dataSource.paginator = this.paginator;
      return;
    }
    let serchedEmojis = [];
    for (let i = 0; i < this.tableData.length; i++) {
      let eName = this.tableData[i]['name'].toLowerCase()
      if (eName.indexOf(name.toLowerCase()) >= 0) {
        serchedEmojis.push(this.tableData[i])
      }
    }
    this.dataSource.data = serchedEmojis;
    this.dataSource.paginator = this.paginator;
  }

  public startLoading() {
    this.isLoading = true;
  }

  public stopLoading() {
    this.isLoading = false;
  }

  ngOnInit() {
    this.route.data.subscribe((data: { type: string }) => {
      this.type = data.type;
    });

    this.startLoading()
    
    this.searchName$.subscribe((v) => {
      this.searchByName(v)
    })

    this.dataSvc.getEmojis(this.type).subscribe((res)=>{
      this.tableData = res;
      this.dataSource = new MatTableDataSource(this.tableData);
      this.dataSource.paginator = this.paginator;
      this.stopLoading();
    }, err => {
      console.log(err);
      this.stopLoading();
    });
    
  }

}
