import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reg-employee',
  imports: [FormsModule,CommonModule,ReactiveFormsModule,HttpClientModule],
  standalone:true,
  providers:[DatePipe],
  templateUrl: './reg-employee.component.html',
  styleUrl: './reg-employee.component.css'
})
export class RegEmployeeComponent implements OnInit {

  @Input() data: any

  employeeForm!: FormGroup;

  departments: any[] = [];
  reporting : any[] = [];
  roleTypes : any[] = [{id: 1 ,name:'Manager'},{id:2 ,name:'Supervisior'},{id:3,name:'Lead'}];

  constructor(private fb: FormBuilder, 
    private router: Router,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private http: HttpClient){
      this.employeeForm = this.fb.group({ 
        id: [null], 
        name: ['', [Validators.required,Validators.maxLength(30)]],
        address: ['', [Validators.required,Validators.maxLength(50)]],
        salary: ['', [Validators.required, Validators.min(0)]],
        gender: ['', [Validators.required]],
        dob: [null, [Validators.required]],    
        departmentId: [null, [Validators.required]],
        inTime : [null,[Validators.required]],
        outTime : [null,[Validators.required]],
        totalHrs : [null],
        reportingId: [null, [Validators.required]],
        roleType : [null,[Validators.required]]
    });
  }

  ngOnInit(){
    this.departmentData()
    this.reportingData()
    this.roleTypeData()

    if (typeof this.data != "undefined") {

      const dobFormatted = this.datePipe.transform(this.data.dob, 'yyyy-MM-dd');

      this.employeeForm.patchValue({
        id: this.data.id,
        name: this.data.name,
        address: this.data.address,
        salary: this.data.salary,
        gender: this.data.gender,
        dob: dobFormatted,
        departmentId: this.data.departmentId,
        inTime : this.data.inTime,
        outTime : this.data.outTime,
        totalHrs : this.data.totalHrs,
        reportingId : this.data.reportingId,
        roleType : this.data.roleType
      })
    }  
  }

  departmentData(){
    this.http.get<any[]>("https://localhost:7124/api/Department/list")
      .subscribe((res) => this.departments = res);
  }

  reportingData(){
    this.http.get<any[]>("https://localhost:7124/api/Employee/employeeList")
      .subscribe((res) => this.reporting = res);
  }

  roleTypeData(){
    this.http.get<any[]>("")
      .subscribe((res) => this.roleTypes = res);
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

  onSave(){
    if( typeof this.data == "undefined")
      {
        if(this.employeeForm.valid)
          {
            this.http.post("https://localhost:7124/api/Employee", this.employeeForm.value)
            .subscribe((res:any) =>
            Swal.fire("Record Save Successfully!"));
            // this.router.navigate(['']);
          } 
      }
    else
      {  
        this.http.put("https://localhost:7124/api/Employee"+'/'+this.employeeForm.value.id ,this.employeeForm.value)
        .subscribe((res:any) =>
        Swal.fire("Record Update Successfully!"));
        this.modalService.dismissAll('Click');
      }
  }

  backToEmployee() {
    this.router.navigate(['']);
  }

  get f() {return this.employeeForm.controls; }
  
}
