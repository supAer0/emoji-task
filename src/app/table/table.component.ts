import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';

export interface TableElement {
  name: string;
  url: string;
}

const ELEMENT_DATA: TableElement[] = [
  { name: 'Hydrogen', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Helium', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Lithium', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Beryllium', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Boron', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Carbon', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Nitrogen', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Oxygen', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Fluorine', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
  { name: 'Neon', url: 'https://github.githubassets.com/images/icons/emoji/unicode/1f947.png?v8'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'url', 'preview', 'action'];
  dataSource = new MatTableDataSource<TableElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

}
