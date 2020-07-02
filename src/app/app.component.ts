import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'

})
export class AppComponent {
    constructor(private router: Router, private location: Location, private activatedRoute: ActivatedRoute) {
  }
}
