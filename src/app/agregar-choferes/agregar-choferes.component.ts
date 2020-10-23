import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { MensajeServicesService } from '../services/mensaje-services.service';

@Component({
  selector: 'app-agregar-choferes',
  templateUrl: './agregar-choferes.component.html',
  styleUrls: ['./agregar-choferes.component.css']
})
export class AgregarChoferesComponent implements OnInit {
  formularioChoferes: FormGroup;
  id:string;
  urlImgChofer: string = '';
  subirImagenPorcentaje: number = 0;
  esEditable: boolean = false;
  constructor(
    private fb: FormBuilder,
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private activateRoute: ActivatedRoute,
    private msj: MensajeServicesService
    ) { }

  ngOnInit(): void {
    this.formularioChoferes = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      sueldo: ['', Validators.required],
      igmChofer: ['', Validators.required]
    })

    this.id = this.activateRoute.snapshot.params.choferID;

    if (this.id != undefined) {
      this.esEditable = true;
      this.db.doc<any>('choferes' +'/' + this.id).valueChanges().subscribe((chofer)=>{

        this.formularioChoferes.setValue({
          nombre: chofer.nombre,
          apellido: chofer.apellido,
          sueldo: chofer.sueldo,
          imgChofer: ''
        })
        this.urlImgChofer = chofer.imgChofer;
      });
    }

  }

  agregar(){
    this.formularioChoferes.value.imgChofer = this.urlImgChofer;
    console.log(this.formularioChoferes.value);
    this.db.collection('choferes').add(this.formularioChoferes.value).then((termino)=>{
      this.msj.mensajesCorrecto('Agregar','Se agrego correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error','Hubo un error');
    })
  }

  editar(){
    this.formularioChoferes.value.imgChofer = this.urlImgChofer;
    this.db.doc('choferes/' + this.id).update(this.formularioChoferes.value).then(()=>{
      this.msj.mensajesCorrecto('Editar','Se edito correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error','Hubo un error');
    })
  }

  subirImagen(evento){

    if (evento.target.files.length > 0) {
      
      let nombre = new Date().getTime().toString();
      let archivo = evento.target.files[0];
  
      let extension = archivo.name.toString().substring(archivo.name.toString().lastIndexOf('.'))
  
      let ruta = 'choferes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto)=>{
        console.log("imagen arriba del servidor");
  
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImgChofer = url;
        })
  
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.subirImagenPorcentaje = parseInt(porcentaje.toString());
      })
    }
  }

}
