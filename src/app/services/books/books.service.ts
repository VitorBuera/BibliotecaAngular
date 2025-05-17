import { Injectable } from '@angular/core';
import { IBooks } from 'src/app/Interfaces/IBooks';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Action } from 'rxjs/internal/scheduler/Action';
import * as book from '../../../assets/books.json';
import { PageEvent } from '@angular/material/paginator';
import { BooksAdmComponent } from 'src/app/pages/crud/books-adm/books-adm.component';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: IBooks[]
  book = book
  base64: any

  constructor
    (
      private snackBar: MatSnackBar
    ) { }

  getBooks() {
    return this.books = JSON.parse(localStorage.getItem('books')!);
  }

  getBooksPagination(page: PageEvent) {
    let end = (page.pageIndex + 1) * page.pageSize
    let start = page.pageIndex * page.pageSize
    let books: IBooks[] = JSON.parse(localStorage.getItem('books')!);
    return books.slice(start, end)
  }

  mockBooks(){
    let books: any = [];

    this.book.items.forEach((_book, i, _allBooks) =>{
      books = _allBooks
    })
      localStorage.setItem('books', JSON.stringify(books))
  }

  hireBook(_bookId: number) {
    this.books = JSON.parse(localStorage.getItem('books')!);
    this.books.forEach((b: any, i) => {
      if (_bookId == b.id && b.rented == 0) {
        b.rented = 1;
        this.books[i] = b;
      }
      else if (_bookId == b.id && b.rented == 1) {
        b.rented = 0;
        this.books[i] = b;
      }
    });
    localStorage.setItem('books', JSON.stringify(this.books));

    return this.getBooks();
  }

  removeBook(_bookId: number) {
    this.books = JSON.parse(localStorage.getItem('books')!);
    let newItens: any[] = [];

    this.books.forEach((b: any) => {
      if (_bookId != b.id) {
        newItens.push(b);
      }
      else if (_bookId == b.id && b.rented == 1) {
        this.snackBar.open('Livro alugado', 'Ok!');
        newItens.push(b);
      }
    });

    localStorage.setItem('books', JSON.stringify(newItens));
  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });}
}
