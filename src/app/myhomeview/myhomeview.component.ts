import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myhomeview',
  templateUrl: './myhomeview.component.html',
  styleUrls: ['./myhomeview.component.css']
})
export class MyhomeviewComponent implements OnInit {
  
  @HostListener('window:beforeunload') goToPage() {
    this.router.navigate(['/']);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
