import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-managerole-admin',
  templateUrl: './managerole-admin.component.html',
  styleUrls: ['./managerole-admin.component.css']
})
export class ManageroleAdminComponent implements OnInit {
  @Input() adminList: Array<UserDetails>;
  @Input() columnDefs: any;
  @Input() roleDefinitions: any;
  @Input() accountStatusDefinitions: any


  constructor() { }

  ngOnInit(): void {
  }

}
