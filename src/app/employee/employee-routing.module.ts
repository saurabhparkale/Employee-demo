import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';

const routes: Routes = [
  { path: 'header', component: EmployeeHeaderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
