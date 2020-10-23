import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.css']
})
export class MenuPrincipalComponent implements OnInit {

  usuario: User;
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe((usuario)=>{
      this.usuario = usuario;
    })
  }
  
  logout() {
    this.auth.signOut();
  }

}
