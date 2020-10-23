import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { PrincipalComponent } from './principal/principal.component';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ListadoChoferesComponent } from './listado-choferes/listado-choferes.component';
import { AgregarChoferesComponent } from './agregar-choferes/agregar-choferes.component';

const routes: Routes = [
  { path: '', redirectTo: 'principal', pathMatch: 'full' },
  { path: 'principal', component: PrincipalComponent },
  { path: 'listado-clientes', component: ListadoClientesComponent },
  { path: 'agregar-cliente', component: AgregarClienteComponent },
  { path: 'agregar-cliente/:clienteID', component: AgregarClienteComponent },
  { path: 'listado-choferes', component: ListadoChoferesComponent },
  { path: 'agregar-choferes', component: AgregarChoferesComponent},
  { path: 'agreagar-choferes/:choferID', component: AgregarChoferesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
