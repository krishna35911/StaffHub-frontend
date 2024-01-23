import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {employeemodel } from '../employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {

  constructor(private http:HttpClient) { }

  serverurl='https://staffhub-server.onrender.com'

  // create object for behavioursubject
  public sharedData=new BehaviorSubject(false)

  updatedata(data:any)
  {  //to access the new value
    this.sharedData.next(data)
  }

  authorization()
  {
    return this.http.get(`${this.serverurl}/employee/1`)
  }

  addEmployeeApi(employee:employeemodel)
  {
   return this.http.post(`${this.serverurl}/employee`,employee)
  }
  getallemployeeApi()
  {
    return this.http.get(`${this.serverurl}/employee`)
  }
  deleteEmployeeApi(id:string)
  {
    return this.http.delete(`${this.serverurl}/employee/${id}`)
  }
  viewemployeeapi(id:string)
  {
    return this.http.get(`${this.serverurl}/employee/${id}`)
  }
  updateEmployeeApi(id:any,employee:any)
  {
    return this.http.put(`${this.serverurl}/employee/${id}`,employee)
  }
  updateadminapi(admin:any)
  {
    return this.http.put(`${this.serverurl}/employee/1`,admin)
  }
}
