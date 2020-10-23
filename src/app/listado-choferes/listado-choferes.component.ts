import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-choferes',
  templateUrl: './listado-choferes.component.html',
  styleUrls: ['./listado-choferes.component.css']
})
export class ListadoChoferesComponent implements OnInit {
  choferes: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit(): void {
    this.choferes.length = 0
    this.db.collection('choferes').get().subscribe((resultado)=>{
      console.log(resultado.docs);

      resultado.docs.forEach((item)=>{
        let chofer = item.data();
        chofer.id = item.id;
        chofer.ref = item.ref;

        this.choferes.push(chofer);
      })
    })
  }

}
