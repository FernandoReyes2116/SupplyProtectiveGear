import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Modulos creados o necesarios
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule, // Agrega HttpClientModule a los imports
    ReactiveFormsModule,
    FormsModule,
    
    

  ],
  exports: [
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    
    

  ]
})
export class SharedModule { }
