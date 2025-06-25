import { CanDeactivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';

export const saveGuard: CanDeactivateFn<RegEmployeeComponent> = (e) => {

  if (!e || !e.employeeForm) return true;

  if (e.employeeForm.dirty && !e.isFormSubmitted) {
    return Swal.fire({
      title: 'Unsaved Changes!',
      text: 'You have unsaved changes. Do you really want to leave?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, leave',
      cancelButtonText: 'No, stay',
    }).then(result => result.isConfirmed);
  }
  return true;
};
