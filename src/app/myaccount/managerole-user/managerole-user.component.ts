import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-managerole-user',
  templateUrl: './managerole-user.component.html',
  styleUrls: ['./managerole-user.component.css']
})
export class ManageroleUserComponent implements OnInit {
  @Input() userList: Array<UserDetails>;
  @Input() columnDefs: any;
  @Input() roleDefinitions: any;
  @Input() accountStatusDefinitions: any

  constructor() { }

  ngOnInit(): void {
  }

}
