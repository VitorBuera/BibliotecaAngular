import { Component, OnInit, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BooksService } from 'src/app/services/books/books.service';
import { BookFormComponent } from '../book-form/book-form.component';
import { BooksAdmComponent } from '../books-adm/books-adm.component';

@Component({
  selector: 'app-book-list-component',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  @Input() booksInput: any;

  constructor
    (
      private bookSvc: BooksService,
      private bookComp: BooksAdmComponent,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
  }

  hireBook(_bookId: number){
    this.bookComp.books = this.bookSvc.hireBook(_bookId);
  }

  remove(_bookId: number){
    this.bookSvc.removeBook(_bookId);
    this.bookComp.books = this.bookSvc.getBooks();
    this.bookComp.length = this.bookComp.books?.length
  }

  edit(_book: any){
   if (_book.rented == 1) {
      this.snackBar.open('Livro alugado', 'Ok!');
      return;
   }
    this.openDialog(_book)
  }

  openDialog(data: any) : void{
    let book = Object.assign({}, data);
    const dialogRef = this.dialog.open(BookFormComponent, {
      data: book
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result?.length > 0){
        this.bookComp.length = result?.length
        this.bookComp.books = result;
      }
    });
  }

}
