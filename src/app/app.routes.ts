import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'header', loadChildren: () => import("./employee/employee-routing.module").then(m => m.EmployeeRoutingModule) },
];
