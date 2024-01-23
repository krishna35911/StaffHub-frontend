import { Component } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import { employeemodel } from '../employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent {
  employee:employeemodel={}

  constructor(private api:AdminapiService,private router:Router){}

  cancelEmployee(){
    this.employee={}
  }
  addEmployee()
  {
    console.log(this.employee);

    if(!this.employee.id || !this.employee.name || !this.employee.email || !this.employee.status)
    {
      // alert('please fill the form completely')
      Swal.fire({
        icon:"info",
        title:"Oops..",
        text:"Please fill the form completely"
      });
    }
    else
    {
      this.api.addEmployeeApi(this.employee).subscribe({
        next:(res:employeemodel)=>{
          console.log(res);
          // alert('Added succesfully')
          Swal.fire({
            icon:"success",
            title:"Woww..",
            text:"Login Successful"
          });
          this.employee={}
          this.router.navigateByUrl('employee')
        }
        ,
        error:(err:any)=>{
          console.log(err);
          
        }
      })
      
    }
    }
    
}
