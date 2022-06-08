import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { IUser } from 'src/app/Interfaces/IUser';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  frmLogin: FormGroup;


  constructor
    (
      private formBuilder: FormBuilder,
      private userSvc: UserService
    ) { }

 ngOnInit(): void {
  this.newForm();
 }

  newForm(){
    this.frmLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }

    logar(){
      if(this.frmLogin.invalid) return;

      var user = this.frmLogin.getRawValue() as IUser;
      this.userSvc.logar(user).subscribe((res) => {
        if(!res.sucesso){
          alert("Falha na Autenticação! Login ou Senha Inválidos")
        }
      })
    }
}
