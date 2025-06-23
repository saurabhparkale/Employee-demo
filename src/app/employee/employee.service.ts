import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private selectInOutTime = new BehaviorSubject<any>(null);
  selectedInOutTime = this.selectInOutTime.asObservable();

  constructor() { }

  selectTime(data : any){
    this.selectInOutTime.next(data);
  }
}
