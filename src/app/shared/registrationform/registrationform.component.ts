import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserSignupDetails } from 'src/app/interfaces/UserDetails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserNameValidation } from 'src/app/helpers/username-validation';
import { MustMatchPassword } from 'src/app/helpers/must-match-password';
import { ToastrService } from 'ngx-toastr';
import { UserRoleType } from '../userroleenum';
import { UserService } from 'src/app/services/user-service';
import { UserInfo } from 'src/app/interfaces/User';
import { IRolesInputData } from 'src/app/interfaces/RolesInterface';

@Component({
  selector: 'app-registrationform',
  templateUrl: './registrationform.component.html',
  styleUrls: ['./registrationform.component.css']
})
export class RegistrationformComponent implements OnInit {
  @Input() registerInputData: IRolesInputData;
  @Output() updateUserTable: any = new EventEmitter();
  showSpinner = false;
  roleName: string = '';

  userSignupDetails: UserSignupDetails = {};
  user: UserInfo = {};

  registerForm: FormGroup;
  registerUserSubmitted = false;
  acceptTerms = false;


  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.roleName = this.registerInputData.roleName;
    this.signupModalPopUp();
    this.createRegisterForm();
  }

  get registerFormControl() { return this.registerForm.controls; }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
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

  signupModalPopUp() {
    this.userSignupDetails = {};
    this.registerUserSubmitted = false;
  }

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
    this.userSignupDetails.createdBy = this.registerInputData.createdByRole; // change to login role
    this.userSignupDetails.role = this.registerInputData.createRole;
    this.userSignupDetails.roleName = this.registerInputData.roleName;
    this._userService.saveUser(this.userSignupDetails).subscribe(
      data => {
        this.user = data;
        if (this.user.errors === null) {
          this.showSpinner = false;
          setTimeout(() => this.toastr.success('Registration Successful', 'Signup', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          document.getElementById("signup-close").click();
          this.updateUserTable.emit(this.registerInputData.createRole);
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
  }

  close () {}



}
