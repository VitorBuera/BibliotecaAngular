import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IUser } from '../../Interfaces/IUser';
import { IBooks } from '../../Interfaces/IBooks';
import * as data from '../../../assets/users.json';
import { BooksService } from '../books/books.service';
@Injectable({
  providedIn: 'root'
})

export class UserService {
  users = data

  constructor
  (
    private router: Router,
    private bookSvc: BooksService
  ) { }

  logar(user: IUser) : Observable<any>{
    return this.mockUserLogin(user).pipe(tap((res) => {
      if(!res.sucesso) return;

      var user: any = [{id: res.id, email: res.email, senha: res.senha, tipoUsuario: res.tipoUsuario}]
      localStorage.setItem('user', (JSON.stringify(user)));

      var books = JSON.parse(localStorage.getItem('books')!)

      if (books?.length == null){
        this.bookSvc.mockBooks();
      }

      if (parseInt(user[0].tipoUsuario) == 1)
      {
        this.router.navigate(['/books']);
      }
      else
      {
        this.router.navigate(['/adm']);
      }
    }));

  }

  private mockUserLogin(_user: IUser) : Observable<any>{
  var retornoMock: any = [];
  this.users.items.forEach((user) =>{

    if(_user.email === user.login && _user.pass === user.pass){
      retornoMock.sucesso = true;
      retornoMock.id = user.id;
      retornoMock.email = user.login;
      retornoMock.senha = user?.pass
      retornoMock.tipoUsuario = user?.tipoUsuario
    }
  })
    if (retornoMock.id > 0) return of(retornoMock);

    retornoMock.sucesso = false;
    retornoMock.usuario = _user;
    return of(retornoMock);
  }

  deslogar(){
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  get obterUsuarioLogado(): IUser {
    return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : '';
  }

  get obterIdUsuarioLogado(): string {
    return localStorage.getItem('id') ? (JSON.parse(localStorage.getItem('id')!) as IUser).id : '-1';
  }


  get logado(): boolean {
    return localStorage.getItem('user') ? true : false;
  }

}
