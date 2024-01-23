import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  islogged()
  {
    return !!localStorage.getItem("name")
  }
}
