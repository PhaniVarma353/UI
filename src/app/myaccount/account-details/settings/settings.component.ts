import { Component, OnInit, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { UserDetails, UserViewDetails } from 'src/app/interfaces/UserDetails';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user-service';
import { UserNameValidation } from 'src/app/helpers/username-validation';
import { UserInfo } from 'src/app/interfaces/User';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';
import { LoginService } from 'src/app/services/login-service';
import { ChangePasswordRequest, ChangePasswordResponse } from 'src/app/interfaces/ChangePasswordDetails';
import { UserRoleTypeName, UserRoleType } from 'src/app/shared/userroleenum';
import { ProjectPropertiesService } from 'src/app/services/project-properties-service';
import { AddressService } from 'src/app/services/address-service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  subscriptions: Subscription;
  userName: string;
  fullName: string;
  userRole: number;
  userId: number;

  showSpinner = false;
  roleName: string = '';

  userDetails: UserDetails = {
    userId: 0
  };
  userInfo: UserInfo;

  userViewDetails: UserViewDetails = {};

  settingsForm: FormGroup;
  settingsSubmitted = false;

  selectedTab = 1;

  genderRadio: string[] = ['Male', 'Female'];
 
  maritalStatusRadio: string[] = ['Single', 'Married'];

  changePasswordSubmitted = false
  changePasswordForm: FormGroup;

  changePasswordDetails: ChangePasswordRequest;
  changePasswordResponse: ChangePasswordResponse;
  submitted: boolean;
  citiesList: Array<MapItem> = [];
  statesList: Array<MapItem> = [];
  countryList: Array<MapItem> = [];
  state?: string;
  country = 'India';
  selectedCountry = 'India';
  selectedState = undefined;
  selectedCity = undefined;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _userService: UserService,
    private _loginUtilityService: LoginUtilityService,
    private _loginService: LoginService,
    private cd: ChangeDetectorRef,
    public fb: FormBuilder,
    private _projectPropertiesService: ProjectPropertiesService,
    private _addressService: AddressService

  ) { }

  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any ;
  editFile: boolean = true;
  removeUpload: boolean = true;

  registrationForm = this.fb.group({
    file: [null]
  })

  ngOnInit(): void {
    this.userDetails.userAddress = {};
    this.userDetails.userAddress.country = this.country
    this.userViewDetails.userAddress = {};
    this.userDetails.userAddress.state = undefined;
    this.userDetails.userAddress.city = undefined;
    this.changePasswordDetails = {};
    this.subscriptions =
    this._loginUtilityService.getUserLoginData$().subscribe(userLoginData => {
      if (userLoginData && userLoginData.userRole) {
        this.userName = userLoginData.userName;
        this.fullName = userLoginData.fullName;
        this.userRole = userLoginData.userRole;
        if (this.userRole === UserRoleType.SUPERADMIN) {
          this.roleName = UserRoleTypeName.SUPERADMIN;
        } else if (this.userRole === UserRoleType.ADMIN) {
          this.roleName = UserRoleTypeName.ADMIN;
        } else if (this.userRole === UserRoleType.MANAGER) {
          this.roleName = UserRoleTypeName.MANAGER;
        } else {
          this.roleName = UserRoleTypeName.USER;
        } 
        this.userId = userLoginData.uid;
        this.getUserById(this.userId);
      }
    });
    this.getStatesAndCountriesList();
    this.createSettingsForm();
    this.createChangePasswordForm();
  }

  getStatesAndCountriesList() {
    this.showSpinner = true;
    this._projectPropertiesService.getCountriesAndStatesList().subscribe(
      data => {
        debugger;
        console.log(data);
        let statesMap = data.statesMap;
        Object.keys(statesMap).forEach(key=>{
          this.statesList.push({id: +key, name: statesMap[key]})
        });
        let countriesMap = data.countriesMap;
        Object.keys(countriesMap).forEach(key=>{
          this.countryList.push({id: +key, name: countriesMap[key]})
        });
        let citiesMap = data.citiesMap;
        Object.keys(citiesMap).forEach(key=>{
          this.citiesList.push({id: +key, name: citiesMap[key]})
        });
        this.getStatesListByCountryId(104);
        this.showSpinner = false;
      }
    );
  }

  getCountryList() {
    this.showSpinner = true;
    this._projectPropertiesService.getCountries().subscribe(
      data => {
        debugger;
        console.log(data);
        let countriesMap = data.countriesMap;
        Object.keys(countriesMap).forEach(key=>{
          this.countryList.push({id: +key, name: countriesMap[key]})
        });
        this.showSpinner = false;
      }
    );
  }


  getStatesListByCountryId(countryId: number) {
    this.showSpinner = true;
    this._addressService.getStatesListByCountryId(countryId).subscribe(
      data => {
        debugger;
        console.log(data);
        let statesMap = data;
        Object.keys(statesMap).forEach(key=>{
          this.statesList.push({id: +key, name: statesMap[key]})
        });
        if (this.userId && this.userDetails && this.userDetails.userAddress && 
          this.userDetails.userAddress.state && this.userDetails.userAddress.state !== undefined) {
            this.statesList.filter(item=> {
              if (item.name === this.userDetails.userAddress.state) {
                this.getCitiesListByCountryId(item.id);
              }
            });
          }
        this.showSpinner = false;
      }
    );
  }

  getCitiesListByCountryId(stateId: number) {
    this.showSpinner = true;
    this._addressService.getCitiesListByStateId(stateId).subscribe(
      data => {
        debugger;
        console.log(data);
        let citiesMap = data;
        this.citiesList = [];
        Object.keys(citiesMap).forEach(key=>{
          this.citiesList.push({id: +key, name: citiesMap[key]})
        });
        this.settingsForm.controls['city'].enable();
        this.showSpinner = false;
      }
    );
  }

  getUserById(userId: number) {
    this.showSpinner = true;
    let a = this._userService.getUserById(userId).subscribe(
      data => {
        debugger;
        console.log(data);
        this.userViewDetails = JSON.parse(JSON.stringify(data));;
        this.userDetails = JSON.parse(JSON.stringify(data));
        this.fullName = this.userDetails.fullName;
        this.userDetails.userAddress.country = 'India';
        this.userViewDetails.userAddress.country = 'INDIA';
        this.showSpinner = false;
        this.userDetails.userId = data.uid;
        this.changePasswordDetails.userId = data.uid;
        this.imageUrl = this.userDetails.imageUrl;
        this.selectedState = this.userDetails.userAddress.state;
        this.selectedCity = this.userDetails.userAddress.city;
      }
    );
  }

  get settingsFormControl() { return this.settingsForm.controls; }

  get changePasswordFormControl() { return this.changePasswordForm.controls; }

  createSettingsForm() {
    this.settingsForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: [{value: '', disabled: true}, [Validators.required, UserNameValidation]],
      email: [{value: '', disabled: true}, [Validators.required, Validators.email]],
      phoneNumber: [{value: '', disabled: true}, [Validators.required, Validators.minLength(10)]],
      gender:['', Validators.required],
      married:['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: ['', Validators.required],
      landMark: ['', Validators.required],
      city: [{value:'', disabled: true}, Validators.required],
      state: [{value:'', disabled: false}, Validators.required],
      country: [{value: '', disabled: true}],
      roleName: [{value: '', disabled: true}],
    });
  }

  createChangePasswordForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      roleName: [{value: '', disabled: true}],
      fullName: [{value: '', disabled: true}]
    })
  }

  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex
  }

  saveSettings() {
    debugger;
    this.settingsSubmitted = true;
    this.showSpinner = true;
    if (this.settingsForm.invalid) {
      setTimeout(() => this.toastr.warning('You must fill all the Required fields', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    this.userDetails.userId = this.userId;
    this.userDetails.imageUrl = this.imageUrl;
    
    debugger;
    this._userService.saveSettings(this.userDetails).subscribe(
      data => {
        this.userDetails = JSON.parse(JSON.stringify(data));
        this.userViewDetails = JSON.parse(JSON.stringify(data));
        if (this.userDetails.errors === null) {
          this.showSpinner = false;
          setTimeout(() => this.toastr.success('Profile updated Successfully', 'Settings', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }));
          document.getElementById("view").click();
        } else {
          this.showSpinner = false;
          this.toastr.error(this.userDetails.errors[0].errorMessage)
        }
      },
      (error: any) => {
        console.log(error);
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Profile update Failed - unknown error', 'Settings', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    )
    debugger;
  }

  close() {}

  changePassword() {
    this.changePasswordSubmitted = true;
    this.showSpinner = true;
    if (this.changePasswordForm.invalid) {
      setTimeout(() => this.toastr.warning('You must fill all the Required fields', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    this._loginService.changePassword(this.changePasswordDetails).subscribe(
      data => {
        if (data !== null && data.changePasswordStatus) {
          this.changePasswordResponse = data;
          console.log(data);
          console.log("Success");
          setTimeout(() => this.toastr.success('Your password has changed Successful', 'Change Password', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          document.getElementById("view").click();
          this.changePasswordDetails = {};
          this.showSpinner = false;
          this.changePasswordSubmitted = false;
        } else {
          console.log('Failed');
          this.showSpinner = false;
          setTimeout(() => this.toastr.error('Password change Failed - ' + data.message, 'Change Password', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
        }
      }, (error: any) => {
        console.log('Failed');
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Password change Failed - unknown error', 'Change Password', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    )
  }


  uploadFile(event) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.userDetails.profilePicture = "Y";
        this.registrationForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = null;
    this.userDetails.profilePicture = 'N';
    this.editFile = true;
    this.removeUpload = false;
    this.registrationForm.patchValue({
      file: [null]
    });
  }
  
  // Submit Registration Form
  onSubmit() {
    this.submitted = true;
    if(!this.registrationForm.valid) {
      alert('Please fill all the required fields to create a super hero!')
      return false;
    } else {
      console.log(this.registrationForm.value)
    }
  }

  onStateSelection() {
    
  }

  countryChange(event){
    console.log(event);
  }

  stateChange(state: any){
    this.selectedState = state;
    this.selectedCity = undefined;
    console.log(state);
    this.statesList.filter( x=> {
      if (x.name === state) {
        debugger;
        this.getCitiesListByCountryId(x.id);
      }
    });
  }

}

export interface MapItem {
  id?: number;
  name?: string;
}
