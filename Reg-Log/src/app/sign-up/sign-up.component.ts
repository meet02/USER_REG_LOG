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
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private service: CommonService,private route:Router,
    private snackbar: MatSnackBar) { }
  userForm:FormGroup
  ngOnInit() {
    this.userForm=this.formBuilder.group({
      fullName:[""],
      email:[""],
      password:[""]
    })
  }

  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  addExtraClass: boolean = false;

  signUp(){

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;

    var data = this.userForm.value
    let body={}
    body["name"]=data.fullName
    body["email"]=data.email
    body["password"]=data.password
    this.service.postMethod(body, '/api/auth/signUp').subscribe(apiRes => {
      if (apiRes.error_status) {
        this.snackbar.open("Error in SignUp", this.action ? "Error" : undefined, config);
      }
      if (!apiRes.error_status) {
        this.route.navigate(['/login'])
        this.snackbar.open("Register successFully", this.action ? "Success" : undefined, config);
      }
    }, error => {
        this.snackbar.open("Error in SignUp", this.action ? "Error" : undefined, config);
    })
  }

}
