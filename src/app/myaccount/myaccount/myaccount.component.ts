import { Component, OnInit, Input, AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, DoCheck, OnDestroy } from '@angular/core';
import { IRolesInputData } from 'src/app/interfaces/RolesInterface';
import { UserRoleType, UserRoleTypeName } from 'src/app/shared/userroleenum';
import { Router, ActivatedRoute } from '@angular/router';
import { Project353Routes } from 'src/app/app.component.routes';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';

@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit, AfterContentChecked,AfterViewInit, OnDestroy {
  subscriptions: Subscription;

  accountSelectedTabIndex: number

  tab: number = 1;
  showRegistration = false;
  roleInputData: IRolesInputData = {};
  userId: number;
  userRole: number;
  userName: string;
  fullName: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _cdr: ChangeDetectorRef,
    private _loginUtilityService: LoginUtilityService
  ) {
    this.accountSelectedTabIndex = +this._activatedRoute.snapshot.params['tab'];
  }

  ngOnInit(): void {
    this.accountSelectedTabIndex = +this._activatedRoute.snapshot.params['tab'];
    this.userId = +this._activatedRoute.snapshot.params['id'];
    this.subscriptions =
    this._loginUtilityService.getUserLoginData$().subscribe(userLoginData => {
      if (userLoginData && userLoginData.userRole) {
        debugger;
        this.userRole = userLoginData.userRole;
        this.userName = userLoginData.userName;
        this.fullName = userLoginData.fullName;
      }
    });
    if (this.accountSelectedTabIndex === 1) {
      document.getElementById("settings").click();
    } else if (this.accountSelectedTabIndex = 2) {
      document.getElementById("help").click();
    }
    this._cdr.detectChanges();
  }

  ngAfterViewInit() {
    // this.accountSelectedTabIndex = +this._activatedRoute.snapshot.params['tab'];
    // if (this.accountSelectedTabIndex === 1) {
    //   document.getElementById("settings").click();
    // } else if (this.accountSelectedTabIndex = 2) {
    //   document.getElementById("help").click();
    // }
    this._cdr.detectChanges();
  }

  ngOnDestroy() {
        this._cdr.detectChanges();
  }

  ngAfterContentChecked() {
    // this.accountSelectedTabIndex = +this._activatedRoute.snapshot.params['tab'];
    // if (this.accountSelectedTabIndex === 1) {
    //   document.getElementById("settings").click();
    // } else if (this.accountSelectedTabIndex = 2) {
    //   document.getElementById("help").click();
    // }
    this._cdr.detectChanges();
  }

  selectTab(tabIndex: number) {
    this.accountSelectedTabIndex = tabIndex;
    if (tabIndex === 1) {
      // this.navigateToSettings(tabIndex);
    } else if (tabIndex === 2) {
      // this.navigateToHelpAndSupport(tabIndex);
    }
  }

  navigateToSettings(tab: number) {
    //this._router.navigate(['../../../' + tab + '/' + 'settings'], { relativeTo: this._activatedRoute });
  }

  navigateToHelpAndSupport(tab: number) {
    //this._router.navigate(['../../../' + tab + '/' + 'helpandsupport'], { relativeTo: this._activatedRoute });
  }

  register(role: number) {
    this.roleInputData.createRole = role;
    if (role === UserRoleType.SUPERADMIN) {
      this.roleInputData.roleName = UserRoleTypeName.SUPERADMIN;
    } else if (role === UserRoleType.ADMIN) {
      this.roleInputData.roleName = UserRoleTypeName.ADMIN;
    } else if (role === UserRoleType.MANAGER) {
      this.roleInputData.roleName = UserRoleTypeName.MANAGER;
    } else {
      this.roleInputData.roleName = UserRoleTypeName.USER;
    }
    this.showRegistration = true;
  }

}
