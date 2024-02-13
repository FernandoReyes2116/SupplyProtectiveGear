// app-routing.module.ts
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Importa los componentes de cada pantalla
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ListRequisicionesComponent } from './components/list-requisiciones/list-requisiciones.component';
import { AperturarEntregasComponent } from './components/aperturar-entregas/aperturar-entregas.component';

//importar variantes de entregas
import { ListEntregasComponent } from './components/list-entregas/list-entregas.component';
import { EditarEntregaComponent } from './components/list-entregas/editar-entrega/editar-entrega.component';

//Importar variantes de Detalle
import { DetallesListComponent } from './components/detalle-entregas/detalles-list/detalles-list.component';
import { DetalleEntregasComponent } from './components/detalle-entregas/detalle-entregas.component';
import { AgregarDetalleComponent } from './components/detalle-entregas/agregar-detalle/agregar-detalle.component';
import { EditarDetalleComponent } from './components/detalle-entregas/editar-detalle/editar-detalle.component';
import { DetallesRegistrosComponent } from './components/detalle-entregas/detalles-registros/detalles-registros.component';
import { AgregarItemsComponent } from './components/detalle-entregas/agregar-items/agregar-items.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
   
      //Componentes Principales
      { path: 'list-requisiciones', component: ListRequisicionesComponent },
      { path: 'aperturar-entregas', component: AperturarEntregasComponent },
      
      //Listado de Entregas
      { path: 'list-entregas', component: ListEntregasComponent },
      { path: 'editar-entregas/:idEntrega', component: EditarEntregaComponent },
      
      //componentes de Detalles
      { path: 'detalle-list', component: DetallesListComponent },
      { path: 'detalle-entregas/:idEntrega', component: DetalleEntregasComponent },
      { path: 'agregar-entregas/:idEntrega', component: AgregarDetalleComponent },
      { path: 'editar-detalle/:idDetalleEntrega', component: EditarDetalleComponent },
      { path: 'detalle-registro/:idDetalleEntrega', component: DetallesRegistrosComponent },
      { path: 'agregar-items/:idDetalleEntrega', component: AgregarItemsComponent },



    ],
  },
  {
    path: '**',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    SharedModule,
  ],
  exports: [RouterModule,SharedModule]
})
export class AppRoutingModule {}
