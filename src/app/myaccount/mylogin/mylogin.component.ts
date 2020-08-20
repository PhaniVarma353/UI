import { Component, OnInit } from '@angular/core';
import { UserInfo, UserDetails } from 'src/app/interfaces/User';
import { HttpClient } from '@angular/common/http'
import { UserService } from 'src/app/services/user-service';
import { UserSignupDetails } from 'src/app/interfaces/UserDetails';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatchPassword } from 'src/app/helpers/must-match-password';
import { UserNameValidation } from 'src/app/helpers/username-validation';
import { ResetPasswordDetails } from 'src/app/interfaces/ResetPasswordDetails';
import { Router, ActivatedRoute } from '@angular/router';
import { Project353Routes } from 'src/app/app.component.routes';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';
import { UserRoleType } from 'src/app/shared/userroleenum';

@Component({
  selector: 'app-mylogin',
  templateUrl: './mylogin.component.html',
  styleUrls: ['./mylogin.component.css']
})
export class MyloginComponent implements OnInit {
  showSpinner = false;

  user: UserInfo = {};
  userDetails: UserDetails = {}
  userSignupDetails: UserSignupDetails = {};
  resetPasswordDetails: ResetPasswordDetails = {};

  registerForm: FormGroup;
  registerUserSubmitted = false;

  loginForm: FormGroup;
  loginSubmitted = false;
  acceptTerms = false;

  resetPasswordForm: FormGroup;
  resetPasswordSubmitted = false;

  constructor(
    private _userService: UserService, private _loginService: LoginService,
    private toastr: ToastrService, private formBuilder: FormBuilder,
    private formBuilderLogin: FormBuilder, private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _loginUtilityService: LoginUtilityService
  ) {
    this.createRegisterForm();
    this.createLoginForm();
    this.createResetPasswordForm();
  }

  ngOnInit(): void {
    this.getUser();
    // setTimeout(() => this.toastr.success('New', 'dfg', { timeOut: 10000, progressBar: true, positionClass: "toast-bottom-left" }))
  }
  signupModalPopUp() {
    this.userSignupDetails = {};
    this.registerUserSubmitted = false;
  }
  resetPasswordModalPopUp() {
    this.resetPasswordDetails = {};
    this.resetPasswordSubmitted = false;
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      userName: ['', [Validators.required, UserNameValidation]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
      confirmPassword: ['', Validators.required],
      agreeTerms: ['', Validators.required]
    }, {
      validator: MustMatchPassword('password', 'confirmPassword')
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilderLogin.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  createResetPasswordForm() {
    this.resetPasswordForm = this.formBuilderLogin.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  resetPassword() {
    this.resetPasswordSubmitted = true;
    this.showSpinner = true;
    if (this.resetPasswordForm.invalid) {
      setTimeout(() => this.toastr.warning('Please enter valid Registered Email Address', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    this._loginService.resetUserLogin(this.resetPasswordDetails).subscribe(
      data => {
        if (data !== null && data.success) {
          console.log(data);
          console.log("Success");
          setTimeout(() => this.toastr.success('Your password has reseted Successful, New password sent to - ' + data.email, 'Reset Password', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          document.getElementById("forget-password-close").click();
          this.clearData();
          this.createRegisterForm();
          this.loginForm.reset();
          this.createResetPasswordForm();
          this.showSpinner = false;
        } else {
          console.log('Failed');
          this.showSpinner = false;
          setTimeout(() => this.toastr.error('Password reset Failed - ' + data.message, 'Reset Password', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
        }
      }, (error: any) => {
        console.log('Failed');
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Password reset Failed - unknown error', 'Signup', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    )
  }

  login() {
    this.loginSubmitted = true;
    this.showSpinner = true;
    if (this.loginForm.invalid) {
      this.showSpinner = false;
      return;
    }
    this._loginService.authenticateUserLogin(this.user).subscribe(
      data => {
        this.userDetails = data;
        console.log(data)
        this.showSpinner = false;
        if (data.accountStatus === 3) {
          setTimeout(() => this.toastr.error(data.errors[0].errorMessage, 'Account Locked', { timeOut: 10000, progressBar: true, positionClass: "toast-bottom-left" }))
        } else if (data.status === true && data.accountStatus === 1) {
          this._loginUtilityService.setUserLoginData(this.userDetails);
          setTimeout(() => this.toastr.success('Login Successful - Welcome ' + data.userName, 'Login', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          if (this.userDetails.userRole === UserRoleType.USER) {
            this._router.navigate(['../' + Project353Routes.myhomeview + '/' + this.userDetails.uid], { relativeTo: this._activatedRoute });
          } else if (this.userDetails.userRole === UserRoleType.SUPERADMIN ||
            this.userDetails.userRole === UserRoleType.ADMIN || this.userDetails.userRole === UserRoleType.MANAGER) {
            this._router.navigate(['../' + Project353Routes.mybusiness + '/' + this.userDetails.uid + '/' + Project353Routes.manageroles], { relativeTo: this._activatedRoute });
          }
        } else if (data.status === false && (data.accountStatus === 1) || data.accountStatus === 0) {
          setTimeout(() => this.toastr.error(data.errors[0].errorMessage, 'Invalid', { timeOut: 10000, progressBar: true, positionClass: "toast-bottom-left" }))
        }
      },
      (error: any) => {
        console.log(error);
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Login Failed', 'Login', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    );
  }

  get registerFormControl() { return this.registerForm.controls; }

  get loginFormControl() { return this.loginForm.controls; }

  get resetFormControl() { return this.resetPasswordForm.controls; }

  registerUser() {
    this.registerUserSubmitted = true;
    this.showSpinner = true;
    if (this.registerForm.invalid) {
      setTimeout(() => this.toastr.warning('You must fill all the Required fields', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    if (!this.acceptTerms) {
      this.showSpinner = false;
      setTimeout(() => this.toastr.warning('You must accept Terms & Conditions', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      return;
    }
    this.userSignupDetails.createdBy = UserRoleType.USER;
    this.userSignupDetails.role = UserRoleType.USER;
    // this.userSignupDetails.roleName = UserRoleTypeName.USER;
    this._userService.saveUser(this.userSignupDetails).subscribe(
      data => {
        this.user = data;
        if (this.user.errors === null) {
          this.showSpinner = false;
          setTimeout(() => this.toastr.success('Registration Successful', 'Signup', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          document.getElementById("signup-close").click();
          this.clearData();
        } else {
          this.showSpinner = false;
          this.toastr.error(this.user.errors[0].errorMessage)
        }
      },
      (error: any) => {
        console.log(error);
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Registration Failed - unknown error', 'Signup', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    )
  }

  private clearData() {
    this.user = {};
    this.userSignupDetails = {};
    this.resetPasswordDetails = {};
  }

  close() {
    this.loginForm.reset();
    // this.createLoginForm();
    // this.createRegisterForm();
    // this.createResetPasswordForm();
  }

  getUser() {
    this.showSpinner = true;
    let a = this._userService.getUsers().subscribe(
      data => {
        console.log(data)
        this.showSpinner = false;
      }
    );
  }

}
