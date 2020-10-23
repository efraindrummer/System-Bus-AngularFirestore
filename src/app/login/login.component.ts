import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /*
  declare un objeto llamado formulario login asignandole la propiedad formGroup
  para asignarle en el componente html que pertenece a esta propiedad y asi 
  fabricar dichas validaciones en el formulario y que una vez asignado en el formulario
  las acciones que se programen en el archivo Typescript se puedad realizar, 
  */ 
  formularioLogin: FormGroup; //importa los forms reactivos pata que pueda funcionar esta propiedad
  datosCorrectos: boolean = true;
  textoError: string =''
  constructor(public creadorFormulario: FormBuilder, public auth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //validaciones del formulario de login para email y password
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([ Validators.required, Validators.email ])],
      password: ['', Validators.required]
    })
  }

  ingresarSistema(){
    /*
    funcion que ingrea al sistema asignandole el auth de la libreria angularfire2 para despues usar la funcion de
    signInWithEmailAndPassword pasandole por propiedades los parametros de email y password
    */ 
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true; //valida si los datos son correctos
      this.spinner.show();//muestra el spinner ngx 
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((usuario)=>{

        console.log(usuario)
        this.spinner.hide();

      }).catch((error)=>{

        this.datosCorrectos = false;
        this.textoError = error.message;//envia mensaje de error
        this.spinner.hide();

      })//fin de la promesa terminado el catch
    }else{
      
      this.datosCorrectos = false;
      this.textoError = 'Por favor revise que los datos esten correctos';
    }
  }

}
