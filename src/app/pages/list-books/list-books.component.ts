import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IBooks } from 'src/app/Interfaces/IBooks';
import { BooksService } from 'src/app/services/books/books.service';
import { ShowBooksComponent } from '../show-books/show-books.component';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})

export class ListBooksComponent {
  expandir = false;
  books: IBooks[]

  @Input() booksInput: any;

  @Output() selecionado = new EventEmitter();
  constructor
  (
    private bookSvc: BooksService,
    private sBookSvc: ShowBooksComponent
  ) { }

  ngOnInit(): void {
  }

  expandirLivro(_expandir: any){
    if (this.expandir == true){
      this.expandir = false;
    }else{
      this.expandir = true;
    }
  }

  hireBook(_bookId: number){
    this.sBookSvc.books = this.bookSvc.hireBook(_bookId);
  }


}
