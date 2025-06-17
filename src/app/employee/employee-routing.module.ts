import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';

const routes: Routes = [
  { path: 'header', component: EmployeeHeaderComponent },
  { path: 'reg', component: RegEmployeeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
