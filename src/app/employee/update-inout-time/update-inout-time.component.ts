import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-inout-time',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './update-inout-time.component.html',
  styleUrl: './update-inout-time.component.css'
})
export class UpdateInoutTimeComponent implements OnInit{

  employeeForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private http: HttpClient,
    private employeeService : EmployeeService,){
      this.employeeForm = this.fb.group({ 
        id: [null], 
        name: ['', [Validators.required,Validators.maxLength(30)]],      
        inTime : [null,[Validators.required]],
        outTime : [null,[Validators.required]],
        totalHrs : [null],       
    });
  }
  ngOnInit(): void {
    this.updateTime()
  }

  showForm: boolean = false;

  updateTime(){
    this.employeeService.selectedInOutTime.subscribe((emp : any) => {
      if (emp) {
        this.employeeForm.patchValue(emp);
        this.showForm = true;
      }
    });
  }


   
 
  result: string = '';
  calculateTotalHrs()
  {
    const inTime = this.employeeForm.value.inTime;
    const outTime = this.employeeForm.value.outTime;

    if (inTime && outTime) {
      const [inH, inM] = inTime.split(':').map(Number);
      const [outH, outM] = outTime.split(':').map(Number);

      const inDate = new Date();
      const outDate = new Date();

      inDate.setHours(inH, inM, 0);
      outDate.setHours(outH, outM, 0);

      const diffMs = outDate.getTime() - inDate.getTime();

      if (diffMs < 0) {
        this.result = 'Invalid time range';
        return;
      }
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      this.result = `${hours} hours ${minutes} minutes`;
    }
    this.employeeForm.patchValue({ totalHrs: this.result });
  }

  onSubmit() {
    const emp = this.employeeForm.value;
    this.http.put(`https://localhost:7124/api/Employee/${emp.id}`, emp).subscribe((res) => {
      Swal.fire("Record Update Successfully!")
    });
  }

   get f() {return this.employeeForm.controls; }

}
