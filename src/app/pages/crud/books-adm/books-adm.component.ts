import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { IBooks } from 'src/app/Interfaces/IBooks';
import { BooksService } from 'src/app/services/books/books.service';
import { SearchService } from 'src/app/services/search/search.service';
import { BookFormComponent } from '../book-form/book-form.component';

@Component({
  selector: 'app-books-adm',
  templateUrl: './books-adm.component.html',
  styleUrls: ['./books-adm.component.scss']
})
export class BooksAdmComponent implements OnInit {

  books: IBooks[] = [];
  queryField = new FormControl();
  pageEvent: PageEvent;
  length: number = 10
  pageSizeOptions: number[] = [1, 5, 10];
  pageSize: number;

  pageEventInit: PageEvent = {length: 10, pageIndex: 0, pageSize: 5, previousPageIndex: 0}

  constructor
  (
    private booksSvc: BooksService,
    private SearchSvc: SearchService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.books = this.booksSvc.getBooks();
    this.changePage(this.pageEventInit)
    this.pageSize = this.pageEventInit.pageSize
  }

  onSearch(){
    this.books = this.SearchSvc.onSearch(this.queryField.value);
  }

  openDialog() : void{
    const dialogRef = this.dialog.open(BookFormComponent, {
      data:{}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.books = this.booksSvc.getBooks();
      this.length = this.books?.length
    });
  }

  changePage(pageEvent: PageEvent){
    let a = this.booksSvc.getBooks()
    this.length = a.length
    this.books = this.booksSvc.getBooksPagination(pageEvent)
  }
}
