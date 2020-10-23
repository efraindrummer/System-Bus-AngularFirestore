import { Component, OnInit } from '@angular/core';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  usuario: User;
  constructor(public auth: AngularFireAuth) { }

  ngOnInit(): void {
    this.auth.user.subscribe((usuario)=>{
      this.usuario = usuario;
    })
  }

}
