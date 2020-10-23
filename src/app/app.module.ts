import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerModule } from "ngx-spinner";
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { PrincipalComponent } from './principal/principal.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { MensajeServicesService } from './services/mensaje-services.service';
import { ListadoChoferesComponent } from './listado-choferes/listado-choferes.component';
import { AgregarChoferesComponent } from './agregar-choferes/agregar-choferes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuPrincipalComponent,
    ListadoClientesComponent,
    PrincipalComponent,
    AgregarClienteComponent,
    ListadoChoferesComponent,
    AgregarChoferesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    FormsModule,
    AngularFireStorageModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    ProgressbarModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    MensajeServicesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
