import { Component, OnInit } from '@angular/core';
import { IRolesInputData } from 'src/app/interfaces/RolesInterface';
import { UserRoleType, UserRoleTypeName } from 'src/app/shared/userroleenum';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginUtilityService } from 'src/app/shared/services/loginutilityservice';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user-service';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-manage-roles',
  templateUrl: './manage-roles.component.html',
  styleUrls: ['./manage-roles.component.css']
})
export class ManageRolesComponent implements OnInit {
  subscriptions: Subscription;
  showSpinner = false;

  roleTab: number = 1;
  showRegistration = false;
  roleInputData: IRolesInputData = {};
  createdByRole: number;

  superAdminList: Array<UserDetails>;
  adminList: Array<UserDetails>;
  managerList: Array<UserDetails>;
  userList: Array<UserDetails>;

  columnDefs: any;

  roleDefinitions = {
    1: 'Super Admin',
    2: 'Admin',
    3: 'Manager',
    4: 'User'
  };

  accountStatusDefinitions = {
    1: 'ACTIVE',
    2: 'INACTIVE',
    3: 'LOCKED',
    4: 'DELETED'
  }


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _loginUtilityService: LoginUtilityService,
    private _userService: UserService

  ) { }

  ngOnInit(): void {
    this.columnDefs = ['USERID', 'FULL NAME', 'USER NAME', 'EMAIL', 'PHONE NUMBER', 'ROLE', 'ACCOUNT STATUS'];
    // this.createdByRole = +this._activatedRoute.snapshot.params['id'];
    this.subscriptions =
      this._loginUtilityService.getUserLoginData$().subscribe(userLoginData => {
        if (userLoginData && userLoginData.userRole) {
          debugger;
          this.createdByRole = userLoginData.userRole;
          this.roleTab = userLoginData.userRole;
          this.getAllUsersOnRole(this.roleTab);
        }
      });
  }

  getAllUsersOnRole(role: number) {
    this.showSpinner = true;
    this._userService.getAllUsersOnRole(role).subscribe(
      data => {
        debugger;
        console.log(data);
        if (role === UserRoleType.SUPERADMIN) {
          this.superAdminList = data;
        } else if (role === UserRoleType.ADMIN) {
          this.adminList = data;
        } else if (role === UserRoleType.MANAGER) {
          this.managerList = data;
        } else {
          this.userList = data;
        }
        this.showSpinner = false;
      }
    );
  }

  selectRole(role: number) {
    this, this.roleTab = role;
    if ((this.superAdminList ===undefined || this.superAdminList.length === 0) && role === UserRoleType.SUPERADMIN) {
      this.getAllUsersOnRole(this.roleTab);
    } else if ((this.adminList === undefined || this.adminList.length === 0) && role === UserRoleType.ADMIN) {
      this.getAllUsersOnRole(this.roleTab);
    } else if ((this.managerList === undefined || this.managerList.length === 0) && role === UserRoleType.MANAGER) {
      this.getAllUsersOnRole(this.roleTab);
    } else {
      if (this.userList === undefined || this.userList.length === 0)
        this.getAllUsersOnRole(this.roleTab);
    }
    debugger;
  }

  register(role: number) {
    this.roleInputData.createdByRole = this.createdByRole;
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
  
  updateUserTable(role: number) {
      this.getAllUsersOnRole(role);
  }
}
