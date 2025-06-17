import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-employee-header',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent implements OnInit{

  employees:Employee[] = [];

constructor(private router: Router,private  http:HttpClient) {}

  ngOnInit(): void {
    this.getEmployeeData()
  }
  getEmployeeData(){
    this.http.get<Employee>("https://localhost:7124/api/Employee")
      .subscribe((res:any) => this.employees = res.employeeData);
  }

  openNewComponent() {
    this.router.navigate(['header/reg']);
  }
}
