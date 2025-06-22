import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from './employee';

@Pipe({
  name: 'employeeSearch',
  standalone: true
})
export class EmployeeSearchPipe implements PipeTransform {
  transform(employees: Employee[], searchText: string): Employee[] {
    if (!employees) return [];
    if (!searchText) return employees;

    searchText = searchText.toLowerCase();
    return employees.filter(emp =>
      emp.name.toLowerCase().includes(searchText) ||
      emp.address?.toLowerCase().includes(searchText) ||
      emp.gender?.toLowerCase().includes(searchText) ||
      emp.salary?.toString().toLowerCase().includes(searchText)
    );
  }
}
