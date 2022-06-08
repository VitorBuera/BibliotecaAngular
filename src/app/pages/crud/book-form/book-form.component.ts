import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IBooks } from 'src/app/Interfaces/IBooks';
import { Book } from 'src/app/Model/Book';
import { BooksService } from 'src/app/services/books/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  books = new Book();
  form: FormGroup
  base64: any

  constructor
    (
      private formBuilder: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public book: any,
      private bookSvc: BooksService,
      private dialogRef: MatDialogRef<BookFormComponent>
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required]],
      author: [null, Validators.required],
      description: [null, Validators.required]
    })
    this.books = this.book;
    this.base64 = this.book.imgPath
  }

  onSubmit() {
    let allBooks: IBooks[] = this.bookSvc.getBooks()
    let newItens: any[] = [];
    allBooks.forEach((b: IBooks) =>{
       if(b.id == this.books.id)
      {
        b.id = this.books.id;
        b.author = this.books.author;
        b.name = this.books.name;
        b.description = this.books.description;
        b.imgPath = this.base64;

        newItens.push(b);
      }
      else
      {
        newItens.push(b);
      }
    });

    if(this.books.id == null){
      newItens.push({id: (allBooks.length + 1).toString(), author: this.books.author, name: this.books.name, description: this.books.description, rented: 0, imgPath: this.base64?.length > 0 ? this.base64 : '../../../assets/img/noImg.jpg'});
    }
    localStorage.setItem('books', JSON.stringify(newItens));

    this.dialogRef.close(newItens)
  }

  async salvarFoto(pic: any) {
    var fileReader = new FileReader()

    fileReader.onloadend = () => {
      this.base64 = fileReader.result;
    }
    fileReader?.readAsDataURL(pic.target?.files[0])

    await this.delay(100);

  }

  private delay(ms: number): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, ms);
    });
  }
}
