import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reg-employee',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  standalone:true,
  templateUrl: './reg-employee.component.html',
  styleUrl: './reg-employee.component.css'
})
export class RegEmployeeComponent implements OnInit {

  employeeForm!: FormGroup;
  departments: any[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient){}

  ngOnInit(){
    this.departmentData()

    this.employeeForm = this.fb.group({ 
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      salary: ['', [Validators.required, Validators.min(0)]],
      gender: ['Male', [Validators.required]],
      dob: [null, [Validators.required]],
      departmentId: [null, [Validators.required]],
    });

    
    
  }

  departmentData(){
    this.http.get<any[]>("https://localhost:7124/api/Department/list")
      .subscribe((res) => this.departments = res);
  }

  onSave(){
    if(this.employeeForm.valid){
      console.log(this.employeeForm.value);
      this.http.post("https://localhost:7124/api/Employee", this.employeeForm.value)
        .subscribe((res:any) =>alert(res.message));

    } else {
      console.log("Form is invalid.");
    }
  }
}
