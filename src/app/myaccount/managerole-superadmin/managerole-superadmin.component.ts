import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-managerole-superadmin',
  templateUrl: './managerole-superadmin.component.html',
  styleUrls: ['./managerole-superadmin.component.css']
})
export class ManageroleSuperadminComponent implements OnInit {
  @Input() superAdminList: Array<UserDetails>;
  @Input() columnDefs: any;
  @Input() roleDefinitions: any;
  @Input() accountStatusDefinitions: any

  constructor() { }

  ngOnInit(): void {
  }

}
