import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, retry, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { CustomStorageService } from './custom-storage.service';
import { environment } from '../environment/environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class HttpTransferService {

  hostUrl:string= environment.hostUrl;;
  apiV1:string='api/v1/';
  auth:string='users/auth';
  leads:string='getLeads'
  tokenResfreshApi:any=''
  isRefreshing:boolean=false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); 
  constructor(private http:HttpClient,private customStorageService:CustomStorageService,private toastr: ToastrService) {

   }
  //start  get leads api call
  getLeads(bodyJson:any){
    let url=this.apiV1+ this.leads
    return this.postMethod(url,bodyJson)
  }
  //end get leads api call

  //start  user login api call
  userLogin(bodyJson:any){
    let url=this.apiV1+ this.auth
    return this.postMethod(url,bodyJson)
  }
  //end  user login api call

  // start handle retry token call
  // call refresh token api 
  private handle401Error(methodType:string,url: string, json: any,toast=true) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null); // Clear token subject to pause requests
      // Call the refresh token API
      return this.refreshToken().pipe(
        switchMap((newToken: string) => {
          this.isRefreshing = false;
          this.customStorageService.setData('token', newToken);  // Store new token
          this.refreshTokenSubject.next(newToken);  // Emit the new token to queued requests
          return this.retryApiCall(methodType,newToken,url,json,toast);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          if(toast)this.toastr.error('Failed to refresh token', 'Error')
          return throwError(() => new Error('Failed to refresh token.'));
        })
      );
    } else {
      // If a refresh is already in progress, queue up the request
      return this.refreshTokenSubject.pipe(
        switchMap((newToken) => {
          return this.retryApiCall(methodType,newToken,url,json,toast);
        })
      );
    }
  }

  // start here : retry api after get new token
  retryApiCall(methodType:string,newToken:string,url:string,json:any={},toast=true):any{
    if (newToken) {
      if(methodType=='POST'){
       return  this.postMethod(url,json)
      }
      if(methodType=='GET'){
      }
    }
    if(toast)this.toastr.error('Failed to refresh token', 'Error')
    return throwError(() => new Error('Token refresh failed.'));
  }
  // end here : retry api after get new token

  // start here : call new token api 
  refreshToken(): Observable<string> {
    const refreshToken = this.customStorageService.getData('refresh_token');
    if(this.tokenResfreshApi && this.tokenResfreshApi!=''){
      return this.http.post<any>(this.hostUrl + this.tokenResfreshApi, { refreshToken }).pipe(
        map((response: any) => {
          return response.token;  // Return the new token
        }),
        catchError((err) => {
          return throwError(() => new Error('Failed to refresh token.'));
        })
      );
    }else{
      return throwError(() => new Error('Failed to refresh token.'));
    }
  }
  // end here : call new token api 
  // End handle retry token call

  // start post method here
  postMethod(url:any,json:any,toast=true){
      var token = this.customStorageService.getData("token") || '';
      const headers = new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization":`Bearer ${token}` 
      });
     return this.http.post(this.hostUrl+url, JSON.stringify(json), { headers: headers }).pipe(
      map((response: any) => {
        return response;
      }),catchError((err : any) => {
        let errorMessage = 'Server Error';
        if(err.status==401){
          return this.handle401Error('POST',url, json,toast);
        }
        if(toast)this.toastr.error(errorMessage, 'Error')
        return throwError(() => new Error(errorMessage));
        
      })
     )
  }
  // end post method here

  
  
}
