import { Component, OnInit, Input } from '@angular/core';
import { UserDetails } from 'src/app/interfaces/UserDetails';

@Component({
  selector: 'app-managerole-manager',
  templateUrl: './managerole-manager.component.html',
  styleUrls: ['./managerole-manager.component.css']
})
export class ManageroleManagerComponent implements OnInit {
  @Input() managerList: Array<UserDetails>;
  @Input() columnDefs: any;
  @Input() roleDefinitions: any;
  @Input() accountStatusDefinitions: any
  constructor() { }

  ngOnInit(): void {
  }

}
