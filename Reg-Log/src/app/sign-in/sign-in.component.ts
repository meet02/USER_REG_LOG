import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: CommonService, private route: Router, 
    private snackbar: MatSnackBar) { }
  userForm: FormGroup
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      email: [""],
      password: [""]
    })
  }

  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass: boolean = false;

  signIn()
  {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    var data = this.userForm.value
    let body = {}
    body["email"] = data.email
    body["password"] = data.password

    localStorage.setItem('LoggedInUser', data.email);
    
    this.service.postMethod(body,'/api/auth/signIn').subscribe(apiRes=>{
      if(apiRes.error_status)
      {
        this.snackbar.open("Error in LogIn", this.action ? "Error" : undefined, config);
      }
      if(!apiRes.error_status){
        this.route.navigate(['/userList'], { state: { "email":data.email} })
        this.snackbar.open("Login successFully", this.action ? "Success" : undefined, config);

      }
    },error=>{
        this.snackbar.open("Error in LogIn", this.action ? "Error" : undefined, config);
    })
  }

}
