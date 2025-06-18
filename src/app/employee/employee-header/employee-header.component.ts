import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


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

  openRegEmployee() {
    this.router.navigate(['header/reg']);
  }

  delete(id: number) {
    const url = `https://localhost:7124/api/Employee/${id}`;
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result:any) => {
      if (result.isConfirmed) {
        this.http.delete(url).subscribe({
        next: (res) => {
          Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          timer: 1500
        });
      this.getEmployeeData()
    },
  });       
  }
});  
}

}
