import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'https://localhost:7124/api/Employee';

  private selectInOutTime = new BehaviorSubject<any>(null);
  selectedInOutTime = this.selectInOutTime.asObservable();

  constructor(private http : HttpClient) {}

  selectTime(data : any){
    this.selectInOutTime.next(data);
  }

  getEmployee() {
    this.http.get<any>(this.baseUrl);
  }

  
}
