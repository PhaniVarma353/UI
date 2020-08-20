import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Project353Routes } from 'src/app/app.component.routes';

@Component({
  selector: 'app-headertwo',
  templateUrl: './headertwo.component.html',
  styleUrls: ['./headertwo.component.css']
})
export class HeadertwoComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
  }

  navigateToActivities() {
    this._router.navigate([Project353Routes.activities], { relativeTo: this._activatedRoute });
  }

  navigateToEvents() {
    this._router.navigate([Project353Routes.events], { relativeTo: this._activatedRoute });
  }

  navigateToMovies() {
    this._router.navigate([Project353Routes.movies], { relativeTo: this._activatedRoute });
  }

  navigateToPlays() {
    this._router.navigate([Project353Routes.plays], { relativeTo: this._activatedRoute });
  }

  navigateToSports() {
    this._router.navigate([Project353Routes.sports], { relativeTo: this._activatedRoute });
  }

}
