import { Component } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private api:AdminapiService,private router:Router){}

  LoginForm()
  {
    if(!this.email || !this.password)
    {
      // alert("Please fill the form completely")
      Swal.fire({
        icon:"info",
        title:"Oops..",
        text:"Please fill the form completely"
      });
    }
    else
    {
      this.api.authorization().subscribe(
        {
          next:(res:any)=>{
            const {email,password}=res
            if(email==this.email && password==this.password)
            {
              // alert("login successful")
              Swal.fire({
                icon:"success",
                title:"Woww..",
                text:"Login Successful"
              });

              this.api.updatedata({d:true})

              localStorage.setItem('name',res.name)
              localStorage.setItem('password',res.password)
              console.log(localStorage);
              
              this.router.navigateByUrl("dashboard")
            }
            else
            {
              // alert("error")
              Swal.fire({
                icon:"error",
                title:"Oopss..",
                text:"Error"
              });
            }
          },
          error:(res:any)=>
          {
            console.log(res);
            
          }
        }
      )
    }
   
  }
 }
