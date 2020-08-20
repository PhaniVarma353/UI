import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project353';

  @HostListener('window:beforeunload') goToPage() {
    this.router.navigate(['/']);
  }
  

  constructor(
    private router: Router
  ) { }

}
