import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute } from '@angular/router';
import { MensajeServicesService } from '../services/mensaje-services.service'

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  formularioCliente: FormGroup;
  //variable declarada para mostrar el porcentaje de subida de la imagen
  subirImagenPorcentaje: number = 0;
  //variable delcarada para mostrar la ruta de la subida de la imagen y que este inicialize vacia
  urlImagen: string = '';
  //variable que se usa para activar el boton de editar
  esEditable: boolean = false;
  id: string;

  
  constructor(
    private fb:FormBuilder, //activa el builder de el formulkario
    private storage: AngularFireStorage, //almacena los datos y los envia a firebase
    private db: AngularFirestore, //se inicializa la base detos
    private activeRoute: ActivatedRoute, //activa la rutas respectivas de los componentes
    private msj: MensajeServicesService 
  ) { }

  ngOnInit(): void {

    //validaciones de cada uno de los campos del respectivo formulario
    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([Validators.required, Validators.email])],
      telefeno: [''],
      imgUrl: ['', Validators.required]
    });
    //fin de la validaciones

    this.id = this.activeRoute.snapshot.params.clienteID;

    if(this.id != undefined){
      /*
        la variable esEditable hace que el cliente 
      */
      this.esEditable = true;
      this.db.doc<any>('clientes' +'/' + this.id).valueChanges().subscribe((cliente)=>{

        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          correo: cliente.correo,
          telefono: cliente.telefono,
          imgUrl: ''
        })
        this.urlImagen = cliente.imgUrl;
      });
    }
    
  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    console.log(this.formularioCliente.value);
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino)=>{
      this.msj.mensajesCorrecto('Agregar','Se agrego correctamente');
    }).catch(()=>{
      this.msj.mensajeError('Error','Hubo un error');
    })
  }

  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen;
    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then(()=>{
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
  
      let ruta = 'clientes/' + nombre + extension;
      const referencia = this.storage.ref(ruta);
      const tarea = referencia.put(archivo);
      tarea.then((objeto)=>{
        console.log("imagen arriba del servidor");
  
        referencia.getDownloadURL().subscribe((url)=>{
          this.urlImagen = url;
        })
  
      })
      tarea.percentageChanges().subscribe((porcentaje)=>{
        this.subirImagenPorcentaje = parseInt(porcentaje.toString());
      })
    }
  }

}
