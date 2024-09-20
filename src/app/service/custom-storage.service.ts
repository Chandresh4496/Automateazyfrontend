import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomStorageService {

  constructor() { }
  setData(key:any,value:any){
    localStorage.setItem(key,value)
  }
  getData(key:any){
    return localStorage.getItem(key)
  }
  clearAllData() {
    localStorage.clear();
  }
}
