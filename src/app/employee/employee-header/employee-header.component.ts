import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ModalDismissReasons, NgbModal, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RegEmployeeComponent } from '../reg-employee/reg-employee.component';


@Component({
  selector: 'app-employee-header',
  imports: [CommonModule,HttpClientModule,NgbNavModule,RegEmployeeComponent],
  templateUrl: './employee-header.component.html',
  styleUrl: './employee-header.component.css'
})
export class EmployeeHeaderComponent implements OnInit{

  employees:Employee[] = [];

constructor(private router: Router,
  private  http:HttpClient,
  private modalService: NgbModal) {}

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


  closeResult = ''
  employeedata: any
  Edit(data: Employee, update: any) {

    this.employeedata = data

    this.modalService.open(update, { ariaLabelledBy: 'modal-basic-title', size: 'lg', scrollable: true }).result.then(
      (result) => {

      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        this.getEmployeeData()
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
