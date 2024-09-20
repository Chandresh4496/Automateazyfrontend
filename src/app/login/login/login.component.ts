import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CustomStorageService } from 'src/app/service/custom-storage.service';
import { HttpTransferService } from 'src/app/service/http-transfer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  signUpForm:any;
  loginForm:any;
  formtype:string='Login';
  isLoading:boolean=false
  passwordTypeAttribute:string='password'
  constructor(private httpService:HttpTransferService,private customStorage:CustomStorageService,private router: Router,private toastr: ToastrService) {
    if(this.router.url?.includes('/signup')){
      this.formtype='Signup'
    }
    var isauthenticate = this.customStorage.getData("isAuthenticated");
    if(isauthenticate)this.router.navigate(['/board']);
  }
  ngOnInit(){
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      username: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  onSubmit(){
    this.isLoading=true
    if(this.formtype=='Login'){
      this.onLogin()
    }else{
      this.onSingup()
    }
  }
  onSingup(){
  }
  onLogin(){
    this.httpService.userLogin(this.loginForm.value)?.subscribe((res:any)=>{
      if(res.code==200){
        let data=res.result
        this.customStorage.setData('token',data.token)
        this.customStorage.setData('userName',data.name)
        this.customStorage.setData('userEmail',data.email)
        this.customStorage.setData('userId',data.id)
        this.customStorage.setData('isAuthenticated',true)
        this.router.navigate(['/board'])
      }else{
        this.toastr.error(res.message, 'Error')
      }
      this.isLoading=false
    },(err)=>{
      this.isLoading=false
    })
  }
   
}
