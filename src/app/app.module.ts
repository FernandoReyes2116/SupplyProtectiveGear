import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//nuevos modulos
import { IonicStorageModule } from '@ionic/storage-angular';
import { SharedModule } from './shared/shared.module';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule


@NgModule({
  declarations: [AppComponent],

  imports: [
    
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    IonicStorageModule,
    SharedModule,
    ComponentsModule,
    RouterModule,
    
  
  ],
  
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
