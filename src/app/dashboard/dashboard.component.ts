import { Component, OnInit } from '@angular/core';
import { AdminapiService } from '../services/adminapi.service';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  showsidebar:boolean=true
  employeecount:Number=0
  adminname:any=""
  admindetails:any=[]
  selected: Date | null =new Date()

  Highcharts: typeof Highcharts = Highcharts;
  profileimage:string='./assets/images/profileimg.png'
  editadminstatus:boolean=false

  chartOptions = {}

  constructor(private api:AdminapiService){
    this.chartOptions={
      chart: {
          type: 'pie'
      },
      title: {
          text: 'Project Report'
      },
      tooltip: {
          valueSuffix: '%'
      },

      plotOptions: {
          series: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: [{
                  enabled: true,
                  distance: 20
              }, {
                  enabled: true,
                  distance: -40,
                  format: '{point.percentage:.1f}%',
                  style: {
                      fontSize: '1.2em',
                      textOutline: 'none',
                      opacity: 0.7
                  },
                  filter: {
                      operator: '>',
                      property: 'percentage',
                      value: 10
                  }
              }]
          }
      },
      credits:{
        enabled:false
      },
      series: [
          {
              name: 'Projects',
              colorByPoint: true,
              data: [
                  {
                      name: 'React',
                      y: 55.02
                  },
                  {
                      name: 'Angular',
                      sliced: true,
                      selected: true,
                      y: 26.71
                  },
                  {
                      name: 'Node',
                      y: 15.5
                  },
                  
              ]
          }
      ]
  }
  HC_exporting(Highcharts);
  }

  ngOnInit(): void {
    if(localStorage.getItem("name"))
    {
      this.adminname=localStorage.getItem("name")
    }

    this.totalemployee()

    // fetching all admin details
    this.api.authorization().subscribe((res:any)=>
    {

      this.admindetails=res
      // console.log(this.admindetails);
      if(res.picture)
      {
        this.profileimage=res.picture
      }
    })
  }

  // when click on toggle hides sidebar
 menubar()
 {
  this.showsidebar=!this.showsidebar
 }

totalemployee()
{
  this.api.getallemployeeApi().subscribe({
    next:(res:any)=>
    {
      console.log(res);
      this.employeecount=res.length
      
    },
    error:(err:any)=>
    {
      console.log(err);
      
    }
  })
}

edit()
{
  this.editadminstatus=true
}

getFile(event:any)
{
  let file=event.target.files[0]
  console.log(file);
  
  // filereader() class is used to convert to url
  let fr= new FileReader()
  fr.readAsDataURL(file)
  fr.onload=(event:any)=>{
    // console.log(event.target.result);
    this.profileimage=event.target.result
    this.admindetails.picture=this.profileimage
  }
}

updateadmin(){
  this.api.updateadminapi(this.admindetails).subscribe({
    next:(res:any)=>
    {
      console.log(res);
      Swal.fire({
        icon:"success",
        title:"Woww..",
        text:"Updated Successfully"
      });
      localStorage.setItem('name',res.name)
      localStorage.setItem('password',res.password)
      this.adminname=localStorage.getItem('name')
    },
    error:(err:any)=>
    {
      console.log(err);
      
    }
  })
}

cancel()
{
  this.api.authorization().subscribe((res:any)=>
    {

      this.admindetails=res
      // console.log(this.admindetails);
      if(res.picture)
      {
        this.profileimage=res.picture
      }
      this.editadminstatus=false
    })
}
}
