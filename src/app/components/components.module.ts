import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

//components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListRequisicionesComponent } from './list-requisiciones/list-requisiciones.component';
import { AperturarEntregasComponent } from './aperturar-entregas/aperturar-entregas.component';

//importar variantes de detalle
import { DetallesListComponent } from './detalle-entregas/detalles-list/detalles-list.component';
import { DetalleEntregasComponent } from './detalle-entregas/detalle-entregas.component';
import { AgregarDetalleComponent } from './detalle-entregas/agregar-detalle/agregar-detalle.component';
import { EditarDetalleComponent } from './detalle-entregas/editar-detalle/editar-detalle.component';
import { DetallesRegistrosComponent } from './detalle-entregas/detalles-registros/detalles-registros.component';

//Import EppAentregar o Items
import { AgregarItemsComponent } from './detalle-entregas/agregar-items/agregar-items.component';


//importar variantes de entregas
import { ListEntregasComponent } from './list-entregas/list-entregas.component';
import { EditarEntregaComponent } from './list-entregas/editar-entrega/editar-entrega.component';


//modulos
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    HomeComponent,
    ListEntregasComponent,
    ListRequisicionesComponent,
    AperturarEntregasComponent,
    DetalleEntregasComponent,
    AgregarDetalleComponent,
    EditarDetalleComponent,
    EditarEntregaComponent,
    DetallesRegistrosComponent,
    DetallesListComponent,
    AgregarItemsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule
    ],
  exports:[
    LoginComponent,
    HomeComponent,
    ListEntregasComponent,
    ListRequisicionesComponent,
    AperturarEntregasComponent,
    DetalleEntregasComponent,
    AgregarDetalleComponent,
    EditarDetalleComponent,
    EditarEntregaComponent,
    DetallesRegistrosComponent,
    DetallesListComponent,
    AgregarItemsComponent

  ]
})
export class ComponentsModule { }
