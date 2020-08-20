import { Component, OnInit } from '@angular/core';
import { ProjectPropertiesService } from 'src/app/services/project-properties-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactusRequest } from 'src/app/interfaces/ContactusDetails';
import { ContactusService } from 'src/app/services/contact-us-service';
import { ToastrService } from 'ngx-toastr';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';

@Component({
  selector: 'app-application-contactus',
  templateUrl: './application-contactus.component.html',
  styleUrls: ['./application-contactus.component.css']
})
export class ApplicationContactusComponent implements OnInit {
  showSpinner = false;
  
  contactusForm: FormGroup;

  contactus: ContactusRequest;

  contactusSubmitted = false;
  userId: number = 0;
  imageUrl: any;

  constructor(
    private _contactusService: ContactusService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _loginUtilityService: LoginUtilityService,
    private _projectPropertiesService: ProjectPropertiesService
  ) { }

  ngOnInit(): void {
    this.contactus = {};
    this.getAllRequests();
    this._loginUtilityService.getUserLoginData$().subscribe(userLoginData => {
      if (userLoginData && userLoginData.userRole) {
        this.userId = userLoginData.uid;
      }
    });
    this.createContactusForm();
  }
  get contactusFormControl() { return this.contactusForm.controls; }

  createContactusForm() {
    this.contactusForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
    })
  }

  getAllRequests() {
    this.showSpinner = true;
    this._projectPropertiesService.getProjectProperties().subscribe(
      data => {
        debugger;
        console.log(data);
        this.imageUrl = data.propertiesMap["CONTACT_US_PAGE_PNG"][0];
        this.showSpinner = false;
      }
    );
  }

  save() {
    this.contactusSubmitted = true;
    this.showSpinner = true;
    if (this.contactusForm.invalid) {
      setTimeout(() => this.toastr.warning('You must fill all the Required fields', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    debugger;
    this.contactus.id = 0;
    this.contactus.userId = this.userId;
    this._contactusService.saveNotes(this.contactus).subscribe(
      data => {
        if (data !== null && data.status) {
          debugger;
          console.log(data);
          console.log("Success");
          setTimeout(() => this.toastr.success('Thank you for filling out the Form', 'Contact us', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          this.contactus = {};
          this.showSpinner = false;
          this.contactusSubmitted = false;
        } else {
          console.log('Failed');
          this.showSpinner = false;
          setTimeout(() => this.toastr.error('Submit Failed - ' + data.errors[0].errorMessage, 'Contact us', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
        }
      }, (error: any) => {
        console.log('Failed');
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Failed - unknown error', 'Contact us', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
      }
    )
  }

}
