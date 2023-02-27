import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserDetails } from 'src/app/model/userDetails';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { user } from 'src/app/store/dealer-store/action';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordType: string = "password";
  errorMsg: string = "";
  submitted: boolean = false;
  userDetails: UserDetails = new UserDetails();

  constructor(private userService: UserService, private router: Router, private store: Store, private authService: AuthenticationService, private cookies: CookieService) { }

  ngOnInit(): void {
  }

  loginForm = new UntypedFormGroup({
    mailId: new UntypedFormControl('', [Validators.required, Validators.email]),
    password: new UntypedFormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
  }
  );

  get form() {
    return this.loginForm.controls;
  }

  onChange(e: any) {
    if (e.target.checked == true) {
      this.passwordType = "text"
    } else {
      this.passwordType = "password"
    }
  }

  getUserDetails() {
    this.userService.getUser(this.loginForm.value.mailId).subscribe({
      next: (data: any) => { this.userDetails = data, this.validateLogin() }
    })
  }

  validateLogin() {
    if ((this.userDetails.mailId == this.loginForm.value.mailId) && (this.userDetails.password == this.loginForm.value.password)) {
      this.errorMsg = ""
      this.store.dispatch(user(this.userDetails))
      const requestBody = { userId: this.userDetails.userId, userRole: this.userDetails.role, mailId: this.userDetails.mailId }
      this.authService.generateToken(requestBody).subscribe({
        next: (data) => {
          const parsedData = JSON.parse(data)
          this.cookies.set('jwt_token', parsedData.JWT, { expires: 3 })
          alert("User Logged in successfully")
          this.gotoDashBoard()
        }
      })

    } else {
      this.errorMsg = "Wrong Login Credentials"
    }
  }

  onSubmit() {
    if (this.loginForm.value.mailId != "" && this.loginForm.value.password != "") {
      this.submitted = true
      this.getUserDetails()
    } else {
      this.errorMsg = "Enter the credentials to login"
    }

  }

  gotoDashBoard() {
    this.router.navigate(['/dealer']);
  }


}
