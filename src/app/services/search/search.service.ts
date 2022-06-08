import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BooksService } from '../books/books.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  books: any = []

  constructor
  (
    private bookSvc: BooksService
  ) { }

  onSearch(value: any){
    this.books = this.bookSvc.getBooks();
    if(value.trim() !== '')
    {
      var filter = value;
      var result = this.books.filter((b: any) => b.name.toLocaleLowerCase().indexOf(filter) !== -1);
      return result;
    }
    else
    {
      return this.bookSvc.getBooks();
    }
  }
}
