import { Component, OnInit } from '@angular/core';
import { employeemodel } from '../employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminapiService } from '../services/adminapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
employee:employeemodel={}

constructor(private route:ActivatedRoute,private api:AdminapiService,private router:Router){}

ngOnInit(): void {
  this.route.params.subscribe((res:any)=>{
    // console.log(res.id);
    const{id}=res
    // console.log(id);
    this.viewEmployee(id)
  })

}

viewEmployee(id:string)
{
  this.api.viewemployeeapi(id).subscribe({
    next:(res:any)=>
    {
      console.log(res);
      this.employee=res
      
    },
    error:(err:any)=>{
      console.log(err);
      
    }
  })
}

editemployee(id:any)
{
  this.api.updateEmployeeApi(id,this.employee).subscribe({
    next:(res:any)=>
    {
      console.log(res);
      Swal.fire({
        icon:"success",
        title:"Woww..",
        text:"Updated Successful"
      });      
      this.router.navigateByUrl('/employee')
    },
    error:(err:any)=>
    {
      console.log(err);
      
    }
  })
}

cancelbutton(id:any)
{
  this.viewEmployee(id)
}
}
