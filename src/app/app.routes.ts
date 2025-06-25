import { Routes } from '@angular/router';
import { EmployeeHeaderComponent } from './employee/employee-header/employee-header.component';

export const routes: Routes = [
    { path: '', component: EmployeeHeaderComponent },
    { path: 'header', 
        loadChildren: () => 
            import("./employee/employee-routing.module")
                .then(m => m.EmployeeRoutingModule) 
    },
];
