import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EmployeeHeaderComponent } from "./employee/employee-header/employee-header.component";

@Component({
  selector: 'app-root',
  imports: [ EmployeeHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DemoEmp';
}
