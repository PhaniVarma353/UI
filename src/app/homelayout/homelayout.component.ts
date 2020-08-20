import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project353Routes } from '../app.component.routes';

@Component({
  selector: 'app-homelayout',
  templateUrl: './homelayout.component.html',
  styleUrls: ['./homelayout.component.css']
})
export class HomelayoutComponent implements OnInit {

  @HostListener('window:beforeunload') goToPage() {
    this._router.navigate(['/home']);
  }

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,) { }

  ngOnInit(): void {
  
  }

  navigateToAboutUs() {
    this._router.navigate([Project353Routes.aboutus], { relativeTo: this._activatedRoute });
  } 

  navigateToContactUs() {
    this._router.navigate([Project353Routes.contactus], { relativeTo: this._activatedRoute });
  }

  navigateToServices() {
    this._router.navigate([Project353Routes.services], { relativeTo: this._activatedRoute });
  }

  navigateToClients() {
    this._router.navigate([Project353Routes.clients], { relativeTo: this._activatedRoute });
  }
}
