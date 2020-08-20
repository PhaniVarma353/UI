import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectPropertiesRequest, ProjectPropertiesResponse } from 'src/app/interfaces/ProjectProperties';
import { ProjectPropertiesService } from 'src/app/services/project-properties-service';

@Component({
  selector: 'app-projectproperties',
  templateUrl: './projectproperties.component.html',
  styleUrls: ['./projectproperties.component.css']
})
export class ProjectpropertiesComponent implements OnInit {

  projectPropertiesSubmitted = false
  projectPropertiesForm: FormGroup;

  projectPropertiesRequest: ProjectPropertiesRequest;
  projectPropertiesResponse: ProjectPropertiesResponse;
  showSpinner: boolean;


  uploadImage = false;
  @ViewChild('fileInput') el: ElementRef;
  imageUrl: any ;
  selectedType = '';

  typeList = ["text", "image"]

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private _projectPropertiesService: ProjectPropertiesService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.projectPropertiesRequest = {};
    this.createProjectPropertiesForm();
  }

  get projectPropertiesFormControl() { return this.projectPropertiesForm.controls; }

  createProjectPropertiesForm() {
    this.projectPropertiesForm = this.formBuilder.group({
      propertyName: ['', Validators.required],
      value: ['', Validators.required],
      type: ['', Validators.required]
    })
  }

  save() {
    this.projectPropertiesSubmitted = true;
    this.showSpinner = true;
    if (this.projectPropertiesForm.invalid && (this.projectPropertiesRequest.type === undefined || this.projectPropertiesRequest.type === 'text') && this.projectPropertiesRequest.value.length === 0) {
      setTimeout(() => this.toastr.warning('You must fill all the Required fields', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    if (this.projectPropertiesRequest.type === 'image' && !this.uploadImage) {
      setTimeout(() => this.toastr.warning('No upload image found', 'Alert', { timeOut: 3000, progressBar: true, positionClass: "toast-bottom-left" }));
      this.showSpinner = false;
      return;
    }
    debugger;
    this._projectPropertiesService.saveProperties(this.projectPropertiesRequest).subscribe(
      data => {
        if (data !== null && data.status) {
          debugger;
          this.projectPropertiesResponse = data;
          console.log(data);
          console.log("Success");
          setTimeout(() => this.toastr.success('Property Saved Successfully', 'Project Properties', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
          this.projectPropertiesRequest = {};
          this.showSpinner = false;
          this.projectPropertiesSubmitted = false;
        } else {
          console.log('Failed');
          this.showSpinner = false;
          setTimeout(() => this.toastr.error('Property Saving Failed - ' + data.errors[0].errorMessage, 'Project Properties', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
        }
      }, (error: any) => {
        console.log('Failed');
        this.showSpinner = false;
        setTimeout(() => this.toastr.error('Property Saving Failed - unknown error', 'Project Properties', { timeOut: 4000, progressBar: true, positionClass: "toast-bottom-left" }))
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
        this.uploadImage = true;
        this.imageUrl = reader.result;
        this.projectPropertiesRequest.value = this.imageUrl;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }

  // Function to remove uploaded file
  removeUploadedFile() {
    let newFileList = Array.from(this.el.nativeElement.files);
    this.imageUrl = null;
    this.projectPropertiesRequest.value = '';
    this.uploadImage = false;
  }

  onTypeSelected() {
    this.projectPropertiesRequest.value = '';
    this.imageUrl = null;
    this.uploadImage = false;
    this.selectedType =this.projectPropertiesRequest.type;
  }

}
