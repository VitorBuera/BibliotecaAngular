import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShowBooksComponent } from './pages/show-books/show-books.component';
import { BooksAdmComponent } from './pages/crud/books-adm/books-adm.component';
import { BookFormComponent } from './pages/crud/book-form/book-form.component';
import { AuthGuardService } from './services/guards/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'books', canActivate: [AuthGuardService], component: ShowBooksComponent },
  { path: 'adm', canActivate: [AuthGuardService], component: BooksAdmComponent},
  { path: 'new', canActivate: [AuthGuardService], component: BookFormComponent},
  { path: 'edit/:id', canActivate: [AuthGuardService], component: BookFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
