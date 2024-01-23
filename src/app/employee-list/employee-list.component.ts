import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import { employeemodel } from '../employee.model';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit{

  allemployee:employeemodel[]=[]

  searchKey:string=""
  
  // for pagination
  p: number = 1;
// oninit is an inteface to implement ngoninit
  constructor(private api:AdminapiService){}

  ngOnInit():void{
    this.allemployeedetails()
  }
// lifecycle hook - call just after the componennt is created and constructor is called

  allemployeedetails()
  {
    this.api.getallemployeeApi().subscribe({
      next:(res:any)=>
      {
        this.allemployee=res
        console.log(this.allemployee);
      },
      error:(err:any)=>
      {
        console.log(err);
        
      }
    })
  }

  removeemployee(id:any)
  {
    this.api.deleteEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res); 
        this.allemployeedetails()
      },
      error:(err:any)=>
      {
        console.log(err);
        
      }
    })
  }

  sortid()
  {
    this.allemployee.sort((a:any,b:any)=>a.id-b.id)
  }
  sortname()
  {
    // localeCompare() method compares two strings
    //localeCompare() method returns sort order -1, 1, or 0 (for before, after, or equal).

    // syntax : string.localeCompare(compareString)
    this.allemployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
  }

  generatepdf()
  {
    const pdf=new jsPDF() 

    let head=[['Id','Employee name','Email','Status']]

    let body:any=[]

    this.allemployee.filter((item)=>item.id!=='1').forEach((item:any)=>{
      body.push([item.id,item.name,item.email,item.status])
    })
    // font size
    pdf.setFontSize(16)

    // title for generating table
    pdf.text('Employee List',10,10)

    // generate table
    autoTable(pdf,{head,body})

    // to open in new tab
    pdf.output('dataurlnewwindow')

    // save and download
    pdf.save('employee.pdf')
  }
}
