import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHeaderComponent } from './employee-header/employee-header.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { saveGuard } from './save.guard';

const routes: Routes = [
  { path: 'header', component: EmployeeHeaderComponent },
  { path: 'reg', component: RegEmployeeComponent, canDeactivate: [saveGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
