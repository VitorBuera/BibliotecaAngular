import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor
  (
    private usersvc: UserService
  ) { }

  ngOnInit(): void {
  }

  deslogar(){
    this.usersvc.deslogar();
  }
}
