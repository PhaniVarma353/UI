import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project353Routes } from 'src/app/app.component.routes';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';
import { userroleenum } from 'src/app/shared/userroleenum';

@Component({
  selector: 'app-headerone',
  templateUrl: './headerone.component.html',
  styleUrls: ['./headerone.component.css']
})
export class HeaderoneComponent implements OnInit {
  sideNavOpen: boolean;
  accountSideNavOpen: boolean;
  subscriptions: Subscription;
  userRole: number;
  userRoleName: string;
  fullName: string;
  loginStatus = false;
  accessManageRoles = false;
  accessManageProject = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _loginUtilityService: LoginUtilityService
  ) { }

  ngOnInit(): void {
    this.sideNavOpen = false;
    this.accountSideNavOpen = false;
    this.subscriptions =
      this._loginUtilityService.getUserLoginData$().subscribe(userLoginData => {
        if (userLoginData && userLoginData.userRole) {
          this.userRole = userLoginData.userRole;
          this.userRoleName = userLoginData.userName;
          this.fullName = userLoginData.fullName;
          this.loginStatus = true;
          this.accessManageProject = false;
          this.accessManageRoles = false;
          if (this.userRole === userroleenum.SUPERADMIN || this.userRole === userroleenum.ADMIN
            || this.userRole === userroleenum.MANAGER) {
            this.accessManageRoles = true;
          }
          if (this.userRole === userroleenum.SUPERADMIN || this.userRole === userroleenum.ADMIN) {
            this.accessManageProject = true;
          }
        } else {
          this.loginStatus = false;
        }
      });
  }

  navigateToLogin() {
    this._router.navigate([Project353Routes.login], { relativeTo: this._activatedRoute });
  }

  navigateToHome() {
    this._router.navigate([Project353Routes.main], { relativeTo: this._activatedRoute });
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

  navigateToMain() {
    this._router.navigate([Project353Routes.main], { relativeTo: this._activatedRoute });
  }

  navigateToSettings(tab: number) {
    this.closeAccountNav();
    this._router.navigate([Project353Routes.myaccount + '/' + this.userRole + '/' + Project353Routes.manageaccount + '/' + tab + '/' + 'settings'], { relativeTo: this._activatedRoute });
  }

  navigateToHelpAndSupport(tab: number) {
    this.closeAccountNav();
    this._router.navigate([Project353Routes.myaccount + '/' + this.userRole + '/' + Project353Routes.manageaccount + '/' + tab + '/' + 'helpandsupport'], { relativeTo: this._activatedRoute });
  }

  openNav() {
    if (this.sideNavOpen === false) {
      this.closeAccountNav();
      document.getElementById("mySidenav").style.width = "250px";
      this.sideNavOpen = true;
      this.accountSideNavOpen = false;
    } else if (this.sideNavOpen === true) {
      this.closeNav();
    }
  }

  openAccountSideNav() {
    if (this.accountSideNavOpen === false) {
      this.closeNav();
      document.getElementById("accountSidenav").style.width = "250px";
      this.accountSideNavOpen = true;
      this.sideNavOpen = false;
    } else if (this.accountSideNavOpen === true) {
      this.closeAccountNav();
    }
  }

  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    this.sideNavOpen = false;
    this.accountSideNavOpen = false;
  }

  closeAccountNav() {
    document.getElementById("accountSidenav").style.width = "0";
    this.accountSideNavOpen = false;
    this.sideNavOpen = false;
  }

  manageUsers() {
    if (this.loginStatus) {
      this.closeNav();
      this._router.navigate([Project353Routes.mybusiness + '/' + 0 + '/' + Project353Routes.manageroles], { relativeTo: this._activatedRoute });
    }
  }

  manageProject() {
    if (this.loginStatus) {
      this.closeNav();
      this._router.navigate([Project353Routes.mybusiness + '/' + 0 + '/' + Project353Routes.manageProject], { relativeTo: this._activatedRoute });
    }
  }

  signOut() {
    // this._loginUtilityService.clearUserLoginData();
    // this._loginUtilityService.setUserLoginData(null);
    this.loginStatus = false;
    this.closeAccountNav();
    this._router.navigate([Project353Routes.login], { relativeTo: this._activatedRoute });
  }

}
