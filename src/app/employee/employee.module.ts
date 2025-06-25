import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [  
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule
  ]
})
export class EmployeeModule { }
