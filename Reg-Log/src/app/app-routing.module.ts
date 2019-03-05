import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component'
import { SignUpComponent } from './sign-up/sign-up.component'
import { UserListComponent } from './user-list/user-list.component'
import { AuthGuardService } from './sign-in/auth-guard.service'

const routes: Routes = [
  {
    path: "", component: SignInComponent,
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  },
  { path: "login", component: SignInComponent },
  { path: "register", component: SignUpComponent },
  { path: "userList", component: UserListComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
