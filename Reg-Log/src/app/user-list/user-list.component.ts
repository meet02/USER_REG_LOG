import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  userList:any
  email:any
  displayedColumns = ["name", "email"]
  constructor(private service: CommonService, private route: Router) {
    this.email=this.route.getCurrentNavigation().extras.state.email
    this.service.getMethod('/api/auth/user').subscribe(apires=>{
      if(apires.error_status)
      {
          alert("error in finding userlist")
      }
      if(!apires.error_status)
      {
        this.userList=apires.data
      }
    },error=>{
        alert("error in finding userList")
    }) 
  }
  ngOnInit() {

  }
  logout()
  {
      localStorage.removeItem("LoggedInUser");
      this.route.navigate(["login"]);
  }
 
}
